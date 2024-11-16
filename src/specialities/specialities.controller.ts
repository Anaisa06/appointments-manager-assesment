import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';

@Controller('specialities')
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) {}

  @Post()
  create(@Body() createSpecialityDto: CreateSpecialityDto) {
    return this.specialitiesService.create(createSpecialityDto);
  }

  @Get()
  findAll() {
    return this.specialitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialitiesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialitiesService.remove(+id);
  }
}
