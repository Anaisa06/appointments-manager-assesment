import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString, Matches, MinDate } from 'class-validator';

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1)

export class CreateAppointmentDto {
  @ApiProperty({ name: 'date', example: '2024-12-06' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  @MinDate(currentDate, {message: 'The appointment must be in the future'})
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
