import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class FilterAppoinmentsQueryDto {
    @ApiPropertyOptional({ name: 'date', example: '2024-12-06'})
    @Transform(({value}) => value ? new Date(value) : null)
    @IsOptional()
    @IsDate()
    date: Date;

    @ApiPropertyOptional({ name: 'specialtyId', example: 1})
    @IsOptional()
    @IsNumber()
    specialtyId: number;

    @ApiPropertyOptional({ name: 'reason', description: 'a key string to filter by reason', example: 'Dolor'})
    @Transform(({value}) => value ? value.toLowerCase() : value)
    @IsOptional()
    @IsString()
    reason: string;

}