import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelEntity } from './entities/level.entity';
import { Repository } from 'typeorm';
import { AddLevelDto } from './interfaces/addLevel.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelEntity)
    private levelRepository: Repository<LevelEntity>,
  ) {}

  findAll(): Promise<LevelEntity[]> {
    return this.levelRepository.find();
  }

  async findOneByName(name: string): Promise<LevelEntity> {
    const level = await this.levelRepository.findOneBy({ name });

    if (!level) {
      throw new HttpException(`Level ${name} not found`, HttpStatus.NOT_FOUND);
    }

    return level;
  }

  async findOneById(id: number): Promise<LevelEntity> {
    const level = await this.levelRepository.findOneBy({ id });

    if (!level) {
      throw new HttpException(
        `Level with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return level;
  }

  async createNewLevel({ name }: AddLevelDto): Promise<LevelEntity> {
    return await this.levelRepository.save({ name });
  }
}
