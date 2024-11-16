import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorQueryDto } from './dto/query.dto';
import { AvailabilityQueryDto } from './dto/availability-query.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get('availability')
  getAvailability(@Query() query: AvailabilityQueryDto) {
    return this.doctorsService.getDoctorAvailability(query);
  }

  @Get('appointments')
  getAppointnets(@Query() query: AvailabilityQueryDto) {
    return this.doctorsService.getDoctorAppointments(query);
  }

  @Get()
  findAll(@Query() query: DoctorQueryDto) {
    return this.doctorsService.findAllOrFilter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
  //   return this.doctorsService.update(+id, updateDoctorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.doctorsService.remove(+id);
  // }
}
