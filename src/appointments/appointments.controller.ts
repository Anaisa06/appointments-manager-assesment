import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { FilterAppoinmentsQueryDto } from './dto/filter-query.dto';
import { PrivateService } from 'src/common/decorators/private-service.decorator';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @PrivateService()
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @PrivateService()
  @Get()
  findAll(@Query() query: FilterAppoinmentsQueryDto) {
    return this.appointmentsService.findAllOrFilter(query);
  }

  @PrivateService()
  @Get('patient/:id')
  findByPatientId(@Param('id') id: string) {
    return this.appointmentsService.findByPatientId(+id);
  }

  @PrivateService()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @PrivateService()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }
}
