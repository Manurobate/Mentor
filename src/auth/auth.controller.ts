import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSigninDto } from './interface/authSignin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() body: AuthSigninDto) {
    return this.authService.signIn(body);
  }
}
