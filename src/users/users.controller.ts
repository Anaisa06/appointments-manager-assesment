import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrivateService } from 'src/common/decorators/private-service.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PrivateService(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @PrivateService()
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }
}
