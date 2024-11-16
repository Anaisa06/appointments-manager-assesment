import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorQueryDto } from './dto/query.dto';
import { AvailabilityQueryDto } from './dto/availability-query.dto';
import { PrivateService } from 'src/common/decorators/private-service.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @PrivateService(Role.ADMIN)
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @PrivateService()
  @Get('availability')
  getAvailability(@Query() query: AvailabilityQueryDto) {
    return this.doctorsService.getDoctorAvailability(query);
  }

  @PrivateService()
  @Get('appointments')
  getAppointnets(@Query() query: AvailabilityQueryDto) {
    return this.doctorsService.getDoctorAppointments(query);
  }

  @PrivateService()
  @Get()
  findAll(@Query() query: DoctorQueryDto) {
    return this.doctorsService.findAllOrFilter(query);
  }

  @PrivateService()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }
}
