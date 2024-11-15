import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './common/config/db.config';
import { InterceptorsModule } from './common/interceptors/interceptors.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { ShiftsModule } from './shifts/shifts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig
    }),
    InterceptorsModule,
    UsersModule,
    AuthModule,
    DoctorsModule,
    AppointmentsModule,
    SpecialitiesModule,
    ShiftsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
