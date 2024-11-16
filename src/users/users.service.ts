import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PrivateService } from 'src/common/decorators/private-service.decorator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();

    if (!users.length) throw new NotFoundException('No users were found');

    return users;
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with id ${id} was not found`);

    return user;
  }
}
