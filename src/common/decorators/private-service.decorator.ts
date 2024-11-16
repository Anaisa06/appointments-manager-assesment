import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../enums/role.enum';

export function PrivateService(role?: Role) {
  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth('access-token'),
  );
}
