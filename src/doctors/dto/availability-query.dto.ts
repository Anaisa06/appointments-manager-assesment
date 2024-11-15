import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

export class AvailabilityQueryDto {
    @ApiProperty({name: 'date', example: '2024-12-06'})
    @Transform(({ value }) => value ? new Date(value) : null)
    @IsDate()
    date: Date;

    @ApiProperty({ name: 'doctorId', example: 1})
    @IsNumber()
    doctorId: number;
}