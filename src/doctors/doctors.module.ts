import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ShiftsModule } from 'src/shifts/shifts.module';
import { SpecialitiesService } from 'src/specialities/specialities.service';
import { SpecialitiesModule } from 'src/specialities/specialities.module';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Appointment]), AuthModule, ShiftsModule, SpecialitiesModule],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [TypeOrmModule, DoctorsService]
})
export class DoctorsModule {}
