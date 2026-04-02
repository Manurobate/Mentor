import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { AddSubjectDto } from './interfaces/addSubject.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
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

  async findOneById(id: number): Promise<SubjectEntity> {
    const subject = await this.subjectRepository.findOneBy({ id });

    if (!subject) {
      throw new HttpException(
        `Subject with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return subject;
  }

  async findOneByName(name: string): Promise<SubjectEntity> {
    const subject = await this.subjectRepository.findOneBy({ name });

    if (!subject) {
      throw new HttpException(
        `Subject ${name} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return subject;
  }

  async createNewSubject({ name }: AddSubjectDto): Promise<SubjectEntity> {
    return await this.subjectRepository.save({ name });
  }

  findFavorite(): string {
    return <string>this.configService.get('FAVORITE_SUBJECT');
  }
}
