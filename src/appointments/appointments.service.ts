import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Not, Repository } from 'typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { UsersService } from 'src/users/users.service';
import { AppointmentStatus } from 'src/common/enums/appointmentStatus.enum';
import { getHoursInRange } from 'src/common/utils/functions.utils';
import { Role } from 'src/common/enums/role.enum';
import { FilterAppoinmentsQueryDto } from './dto/filter-query.dto';
import { SpecialitiesService } from 'src/specialities/specialities.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment) private appointmentsRepository: Repository<Appointment>,
    private doctorsService: DoctorsService,
    private usersService: UsersService,
    private specialtyService: SpecialitiesService
  ) { }

  async create(createAppointmentDto: CreateAppointmentDto) {
    const doctor = await this.doctorsService.findOne(createAppointmentDto.doctorId);

    const collaboratorHours = getHoursInRange(doctor.shift.startTime, doctor.shift.endTime);

    if (!collaboratorHours.includes(createAppointmentDto.time)) throw new BadRequestException('The time must be on Doctor\'s shift');

    const existingAppointment = await this.appointmentsRepository.findOne({
      where: {
        doctor,
        date: createAppointmentDto.date,
        time: createAppointmentDto.time,
        status: Not(AppointmentStatus.CANCELLED)
      }
    });

    if (existingAppointment) throw new ConflictException('The appointment has been already taken');

    const user = await this.usersService.findOneById(createAppointmentDto.userId);

    if(user.role != Role.PATIENT) throw new BadRequestException('The user is not a patient');

    const { speciality } = doctor;

    const newAppointment = this.appointmentsRepository.create({
      ...createAppointmentDto,
      user,
      doctor,
      speciality
    })

    return await this.appointmentsRepository.save(newAppointment);
  }

  async findAllOrFilter(queryDto: FilterAppoinmentsQueryDto) {
    const query = this.appointmentsRepository.createQueryBuilder('appointment')
    .leftJoinAndSelect('appointment.speciality', 'speciality');

    const { reason, specialtyId, date } = queryDto;

    if(date) {
      query.andWhere('appointment.date = :date', {date})
    }

    if(specialtyId) {
      const specialty = await this.specialtyService.findOne(specialtyId);
      query.andWhere('appointment.speciality = :specialty', {specialty: specialty.id});
    }

    if(reason) {
      query.andWhere('appointment.reason LIKE :keyword', { keyword: `%${reason}%`})
    }



    return await query.getMany();
  }

  async findOne(id: number) {
    return await this.appointmentsRepository.findOne({ where: { id } });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
