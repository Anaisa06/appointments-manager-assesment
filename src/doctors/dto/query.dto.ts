import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class DoctorQueryDto {
  @ApiPropertyOptional({ name: 'specialtyId', example: 1 })
  @IsOptional()
  specialtyId: number;

  @ApiPropertyOptional({ name: 'shiftId', example: 1 })
  @IsOptional()
  shiftId: number;
}
