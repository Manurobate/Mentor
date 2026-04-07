import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './interface/createUser.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signupUser(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(body);
  }
}
