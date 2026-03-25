import { Inject, Injectable } from '@nestjs/common';
import type { InterfacePostSubject } from './subject';
import { InterfaceLevelSubject } from '../level/level';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<SubjectEntity[]> {
    const cachedSubjects =
      await this.cacheManager.get<SubjectEntity[]>('findAll');
    if (!cachedSubjects) {
      const subjects = await this.subjectRepository.find();
      await this.cacheManager.set('findAll', subjects, 0);
      return subjects;
    } else {
      return cachedSubjects;
    }
  }

  findOneById(id: number): Promise<SubjectEntity | null> {
    return this.subjectRepository.findOneBy({ id });
  }

  async createNewSubject({
    name,
  }: InterfacePostSubject): Promise<SubjectEntity> {
    const newSubject = new SubjectEntity();
    newSubject.name = name;

    return await this.subjectRepository.save(newSubject);
  }

  async findSubjectAndLevelsFromName(
    name: string,
  ): Promise<InterfaceLevelSubject | null> {
    const subject = await this.subjectRepository.findOne({
      where: { name },
      relations: { level: true },
    });
    if (!subject) {
      return null;
    }

    return {
      subject: {
        id: subject.id,
        name: subject.name,
      },
      level: {
        id: subject.level.id,
        name: subject.level.name,
      },
    };
  }

  findFavorite(): string {
    return 'Informatique';
  }
}
