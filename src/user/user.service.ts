import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './interface/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }
  async createUser({
    firstname,
    lastname,
    email,
    password,
    role,
  }: CreateUserDto): Promise<UserEntity> {
    try {
      const passwordHash = await bcrypt.hash(password, 10);

      return await this.userRepository.save({
        firstname,
        lastname,
        email,
        passwordHash,
        role,
      });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as {
          code?: string;
          errno?: number;
        };

        if (
          driverError?.code === 'ER_DUP_ENTRY' ||
          driverError?.errno === 1062
        ) {
          throw new HttpException('Email already exists', HttpStatus.CONFLICT);
        }
      }

      throw error;
    }
  }
}
