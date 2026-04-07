import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './interface/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../guards/role.decorator';
import { Role } from './interface/role';
import { RolesGuard } from '../guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signupUser(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(body);
  }

  @Get('me')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  userInfo(@Req() { user }): Promise<UserEntity | null> {
    return this.userService.findOneByEmail(user.username);
  }
}
