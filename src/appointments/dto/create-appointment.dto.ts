import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString, Matches } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ name: 'date', example: '2024-12-06' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  date: Date;

  @ApiProperty({ name: 'time', example: '12:00' })
  @Matches(/^([01]\d|2[0-3]):00$/, { message: "Must be o'clock hour" })
  time: string;

  @ApiProperty({ name: 'reason', example: 'Dolor de cabeza' })
  @IsString()
  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  reason: string;

  @ApiProperty({ name: 'userId', example: 3 })
  @IsNumber()
  userId: number;

  @ApiProperty({ name: 'doctorId', example: 7 })
  @IsNumber()
  doctorId: number;
}
