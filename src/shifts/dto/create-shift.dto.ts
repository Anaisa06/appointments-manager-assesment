import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { ShiftEnum } from "src/common/enums/shifts.enum";

export class CreateShiftDto {
    @ApiProperty({name: 'name', example: ShiftEnum.MORNING})
    @IsEnum(ShiftEnum)
    name: ShiftEnum;

    @ApiProperty({name: 'startTime', example: '08:00'})
    @IsString()
    startTime: string;

    @ApiProperty({name: 'endTime', example: '16:00'})
    @IsString()
    endTime: string;
}
