import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { ShiftEnum } from "src/common/enums/shifts.enum";

export class DoctorQueryDto {
    @ApiPropertyOptional({ name: 'specialtyId', example: 1})
    @IsOptional()
    specialtyId: number;

    @ApiPropertyOptional({ name: 'shiftId', example: 1})
    @IsOptional()
    shiftId: number;

}