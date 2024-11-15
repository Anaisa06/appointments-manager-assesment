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

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment) private appointmentsRepository: Repository<Appointment>,
    private doctorsService: DoctorsService,
    private usersService: UsersService
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
    const { speciality } = doctor;

    const newAppointment = this.appointmentsRepository.create({
      ...createAppointmentDto,
      user,
      doctor,
      speciality
    })

    return await this.appointmentsRepository.save(newAppointment);
  }

  async findAll() {
    return await this.appointmentsRepository.find();
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
