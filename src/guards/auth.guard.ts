import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Role } from '../user/interface/role';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtservice: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException();
    }

    try {
      type JwtPayload = {
        sub: number;
        username: string;
        role: Role;
      };

      request['user'] = await this.jwtservice.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET_TOKEN'),
      });
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
