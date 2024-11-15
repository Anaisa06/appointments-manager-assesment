import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Speciality } from './entities/speciality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialitiesService {
  constructor(
    @InjectRepository(Speciality) private specialityRepository: Repository<Speciality>
  ){}

  async create(createSpecialityDto: CreateSpecialityDto) {
    const existingService = await this.findOneByName(createSpecialityDto.name);

    if(existingService) throw new ConflictException('The speciality already exists');

    const newSpeciality = this.specialityRepository.create(createSpecialityDto);

    return await this.specialityRepository.save(newSpeciality);
  }

  async findAll() {
    return await this.specialityRepository.find();
  }

  async findOne(id: number) {
    const speciality = await this.specialityRepository.findOne({ where: {id}});
    if(!speciality) throw new NotFoundException('Speciality was not found');
    return speciality;
  }

  async findOneByName(name: string) {
    const service = await this.specialityRepository.findOne({ where: {name}});
    return service;
  }

  update(id: number, updateSpecialityDto: UpdateSpecialityDto) {
    return `This action updates a #${id} speciality`;
  }

  remove(id: number) {
    return `This action removes a #${id} speciality`;
  }
}
