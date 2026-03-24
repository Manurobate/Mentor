import { Injectable } from '@nestjs/common';
import type { InterfaceLevelSubject } from './level';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelEntity } from './entities/level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelEntity)
    private levelRepository: Repository<LevelEntity>,
  ) {}

  findAll(): Promise<LevelEntity[]> {
    return this.levelRepository.find();
  }

  async findLevelAndSubjectByName(
    name: string,
  ): Promise<InterfaceLevelSubject | null> {
    const level = await this.levelRepository.findOneBy({ name });
    if (!level) {
      return null;
    }

    return {
      subject: {
        id: level.subject.id,
        name: level.subject.name,
      },
      level: {
        id: level.id,
        name: level.name,
      },
    };
  }
}
