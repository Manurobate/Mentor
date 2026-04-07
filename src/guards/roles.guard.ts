import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from './role.decorator';
import { Request } from 'express';
import { Role } from '../user/interface/role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    type JwtUser = {
      sub: number;
      username: string;
      role: Role;
    };

    type RequestWithUser = Request & {
      user: JwtUser;
    };

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    return requiredRoles.some((role) => user.role === role);
  }
}
