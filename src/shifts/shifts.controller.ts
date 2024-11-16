import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { PrivateService } from 'src/common/decorators/private-service.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @PrivateService(Role.ADMIN)
  @Post()
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftsService.create(createShiftDto);
  }

  @PrivateService(Role.ADMIN)
  @Get()
  findAll() {
    return this.shiftsService.findAll();
  }

  @PrivateService(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftsService.update(+id, updateShiftDto);
  }

  @PrivateService(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiftsService.remove(+id);
  }
}
