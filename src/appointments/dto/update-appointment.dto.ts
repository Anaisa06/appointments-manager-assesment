import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { AppointmentStatus } from 'src/common/enums/appointmentStatus.enum';

export class UpdateAppointmentDto {
    @ApiPropertyOptional({ name: 'date', example: '2024-12-07'})
    @IsOptional()
    @Transform(({value}) => value ? new Date(value) : value)
    date: Date;

    @ApiPropertyOptional({ name: 'time', example: '12:00'})
    @IsOptional()
    @IsString()
    time: string;

    @ApiPropertyOptional({ name: 'status', example: AppointmentStatus.PROGRESS})
    @IsOptional()
    @IsEnum(AppointmentStatus)
    status: AppointmentStatus;

    @ApiPropertyOptional({ name: 'notes', example: 'El paciente se encuentra en buen estado general, con dolor leve en epigastrio'})
    @IsOptional()
    @IsString()
    notes: string;
}
