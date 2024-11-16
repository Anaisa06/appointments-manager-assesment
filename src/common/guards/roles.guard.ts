import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { Role } from "../enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext) {

        const requiredRole = this.reflector.get<Role>('role', context.getHandler());

        if(!requiredRole) return true;

        const request = context.switchToHttp().getRequest();

        const userPayload = request.user as IJwtPayload;

        if(userPayload.role !== requiredRole) throw new ForbiddenException('You are forbidden for this action');

        return true;
      }
}