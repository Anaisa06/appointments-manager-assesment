import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { ShiftEnum } from 'src/common/enums/shifts.enum';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift) private shiftsRepository: Repository<Shift>
  ) { }
  async create(createShiftDto: CreateShiftDto) {
    const newShift = this.shiftsRepository.create(createShiftDto);
    return await this.shiftsRepository.save(newShift);
  }

  async findAll() {
    return await this.shiftsRepository.find();
  }

  async findOneByName(name: ShiftEnum) {
    const shift = await this.shiftsRepository.findOne({ where: { name } });
    if (!shift) throw new NotFoundException('Shift was not found');
    return shift;
  }

  async findOne(id: number) {
    const shift = await this.shiftsRepository.findOne({ where: { id } });
    if (!shift) throw new NotFoundException('Shift was not found');
    return shift;
  }

  update(id: number, updateShiftDto: UpdateShiftDto) {
    return `This action updates a #${id} shift`;
  }

  remove(id: number) {
    return `This action removes a #${id} shift`;
  }
}
