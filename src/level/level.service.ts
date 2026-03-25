import { Injectable } from '@nestjs/common';
import type { InterfaceLevelSubjects } from './level';
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
  ): Promise<InterfaceLevelSubjects | null> {
    const level = await this.levelRepository.findOne({
      where: { name },
      relations: { subjects: true },
    });
    if (!level) {
      return null;
    }

    return {
      level: {
        id: level.id,
        name: level.name,
      },
      subjects: level.subjects.map((subject) => ({
        id: subject.id,
        name: subject.name,
      })),
    };
  }
}
