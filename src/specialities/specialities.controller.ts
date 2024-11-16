import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { PrivateService } from 'src/common/decorators/private-service.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('specialities')
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) {}

  @PrivateService(Role.ADMIN)
  @Post()
  create(@Body() createSpecialityDto: CreateSpecialityDto) {
    return this.specialitiesService.create(createSpecialityDto);
  }

  @PrivateService()
  @Get()
  findAll() {
    return this.specialitiesService.findAll();
  }

  @PrivateService()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialitiesService.findOne(+id);
  }

  @PrivateService(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialitiesService.remove(+id);
  }
}
