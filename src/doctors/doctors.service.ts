import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ShiftsService } from 'src/shifts/shifts.service';
import { SpecialitiesService } from 'src/specialities/specialities.service';
import { Role } from 'src/common/enums/role.enum';
import { DoctorQueryDto } from './dto/query.dto';
import { AvailabilityQueryDto } from './dto/availability-query.dto';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { getHoursInRange } from 'src/common/utils/functions.utils';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor) private doctorsRepository: Repository<Doctor>,
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private authService: AuthService,
    private shiftsService: ShiftsService,
    private specialtiesService: SpecialitiesService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const user = await this.authService.register({
      ...createDoctorDto,
      role: Role.DOCTOR,
    });

    if (!user)
      throw new InternalServerErrorException('Error creating new user');

    const shift = await this.shiftsService.findOneByName(createDoctorDto.shift);
    const speciality = await this.specialtiesService.findOne(
      createDoctorDto.specialityId,
    );

    const newDoctor = this.doctorsRepository.create({
      name: createDoctorDto.name,
      shift,
      speciality,
      user,
    });

    return await this.doctorsRepository.save(newDoctor);
  }

  async findAllOrFilter(queryDto: DoctorQueryDto) {
    const query = this.doctorsRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.shift', 'shift')
      .leftJoinAndSelect('doctor.speciality', 'speciality');

    const { specialtyId, shiftId } = queryDto;

    if (specialtyId) {
      const specialty = await this.specialtiesService.findOne(specialtyId);
      query.andWhere('doctor.speciality = :speciality', {
        speciality: specialty.id,
      });
    }

    if (shiftId) {
      const existingShift = await this.shiftsService.findOne(shiftId);
      console.log(existingShift);
      query.andWhere('doctor.shift = :shift', { shift: existingShift.id });
    }

    return await query.getMany();
  }

  async getDoctorAvailability(queryDto: AvailabilityQueryDto) {
    const doctor = await this.findOne(queryDto.doctorId);

    const appointments = await this.getDoctorAppointments(queryDto);

    const busyHours = appointments.map((appointment) => appointment.time);
    const hoursList = getHoursInRange(
      doctor.shift.startTime,
      doctor.shift.endTime,
    );
    const availableHours = hoursList.filter(
      (hour) => !busyHours.includes(hour),
    );

    return availableHours;
  }

  async getDoctorAppointments(queryDto: AvailabilityQueryDto) {
    const doctor = await this.findOne(queryDto.doctorId);
    const appointments = await this.appointmentsRepository.find({
      where: { doctor, date: queryDto.date },
    });
    return appointments;
  }

  async findOne(id: number) {
    const doctor = await this.doctorsRepository.findOne({
      where: { id },
      relations: ['shift', 'speciality'],
    });
    if (!doctor) throw new NotFoundException('Doctor was not found');
    return doctor;
  }

  // update(id: number, updateDoctorDto: UpdateDoctorDto) {
  //   return `This action updates a #${id} doctor`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} doctor`;
  // }
}
