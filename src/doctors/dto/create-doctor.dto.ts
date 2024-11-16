import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { RegisterUserDto } from 'src/auth/dto/register.dto';
import { ShiftEnum } from 'src/common/enums/shifts.enum';

export class CreateDoctorDto extends RegisterUserDto {
  @ApiProperty({ name: 'shift', example: ShiftEnum.MORNING })
  @IsEnum(ShiftEnum)
  shift: ShiftEnum;

  @ApiProperty({ name: 'specialityId', example: 1 })
  @IsNumber()
  specialityId: number;
}
