import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSpecialityDto {
  @ApiProperty({ name: 'name', example: 'Consulta general' })
  @IsString()
  name: string;
}
