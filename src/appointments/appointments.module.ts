import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { UsersModule } from 'src/users/users.module';
import { SpecialitiesModule } from 'src/specialities/specialities.module';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    DoctorsModule,
    UsersModule,
    SpecialitiesModule,
    GatewayModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [TypeOrmModule, AppointmentsService],
})
export class AppointmentsModule {}
