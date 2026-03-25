import { Injectable } from '@nestjs/common';
import type { InterfacePostSubject } from './subject';
import { InterfaceLevelSubject } from '../level/level';
import { ConfigService } from '../config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    private configService: ConfigService,
  ) {}

  findAll(): Promise<SubjectEntity[]> {
    return this.subjectRepository.find();
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
    return this.configService.get('FAVORITE_SUBJECT');
  }
}
