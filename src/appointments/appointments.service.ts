import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Shift } from 'src/shifts/entities/shift.entity';
import { isAfter, subHours } from 'date-fns';
import { SocketService } from 'src/gateway/socket.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private doctorsService: DoctorsService,
    private usersService: UsersService,
    private specialtyService: SpecialitiesService,
    private socketService: SocketService
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const doctor = await this.doctorsService.findOne(
      createAppointmentDto.doctorId,
    );

    this.verifyShiftHoursRange(doctor.shift, createAppointmentDto.time);

    await this.checkIfAppointmentIsTaken(
      createAppointmentDto.date,
      createAppointmentDto.time,
      doctor,
    );

    const user = await this.usersService.findOneById(
      createAppointmentDto.userId,
    );

    if (user.role != Role.PATIENT)
      throw new BadRequestException('The user is not a patient');

    const { speciality } = doctor;

    const newAppointment = this.appointmentsRepository.create({
      ...createAppointmentDto,
      user,
      doctor,
      speciality,
    });

    const savedAppointment = await this.appointmentsRepository.save(newAppointment);
    this.socketService.handleAddAppointment()

    return savedAppointment
  }

  async checkIfAppointmentIsTaken(date: Date, time: string, doctor: Doctor) {
    const existingAppointment = await this.appointmentsRepository.findOne({
      where: {
        doctor,
        date,
        time,
        status: Not(AppointmentStatus.CANCELLED),
      },
    });

    if (existingAppointment)
      throw new ConflictException('The appointment has been already taken');
  }

  verifyShiftHoursRange(shift: Shift, time: string) {
    const shiftHours = getHoursInRange(shift.startTime, shift.endTime);
    if (!shiftHours.includes(time))
      throw new BadRequestException("The time must be on Doctor's shift");
  }

  async findAllOrFilter(queryDto: FilterAppoinmentsQueryDto) {
    const query = this.appointmentsRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.speciality', 'speciality');

    const { reason, specialtyId, date } = queryDto;

    if (date) {
      query.andWhere('appointment.date = :date', { date });
    }

    if (specialtyId) {
      const specialty = await this.specialtyService.findOne(specialtyId);
      query.andWhere('appointment.speciality = :specialty', {
        specialty: specialty.id,
      });
    }
    await this.getFutureAppointments();

    if (reason) {
      query.andWhere('appointment.reason LIKE :keyword', {
        keyword: `%${reason}%`,
      });
    }
    return await query.getMany();
  }

  async getFutureAppointments() {
    const currentColombianDate = subHours(new Date(), 5);
    const allAppointments = await this.appointmentsRepository.find();

    const futureAppointments = allAppointments.filter(appointment => isAfter(appointment.date, currentColombianDate));

    return futureAppointments;
  }

  async findByPatientId(id: number) {
    const patient = await this.usersService.findOneById(id);
    if (patient.role != Role.PATIENT)
      throw new BadRequestException('The user is not a patient');

    const appointments = await this.appointmentsRepository.find({
      where: { user: patient },
    });

    return appointments;
  }

  async findOne(id: number) {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ['doctor'],
    });
    if (!appointment) throw new NotFoundException('Appointment was not found');
    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);
    const doctor = await this.doctorsService.findOne(appointment.doctor.id);
    const { time, date } = updateAppointmentDto;

    if (time) {
      this.verifyShiftHoursRange(doctor.shift, updateAppointmentDto.time);
    }
    if (date) {
      await this.checkIfAppointmentIsTaken(
        date,
        time ? time : appointment.time,
        doctor,
      );
    }

    await this.appointmentsRepository.update(id, updateAppointmentDto);

    return await this.findOne(id);
  }
}
