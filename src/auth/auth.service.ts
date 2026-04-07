import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSigninDto } from './interface/authSignin.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: AuthSigninDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    if (!(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.email,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
