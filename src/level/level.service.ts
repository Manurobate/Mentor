import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { InterfaceLevel, InterfaceLevelSubject } from './level';
import { SubjectService } from '../subject/subject.service';
import { BddService } from '../bdd/bdd.service';

@Injectable()
export class LevelService {
  constructor(
    @Inject(forwardRef(() => SubjectService))
    private readonly subjectService: SubjectService,
    private bdd: BddService,
  ) {}

  findAll(): InterfaceLevel[] {
    return this.bdd.get<InterfaceLevel>('levels');
  }

  findLevelAndSubjectByName(name: string): InterfaceLevelSubject[] {
    const level = this.findAll().find((l) => l.name === name);

    if (level === undefined) {
      return [];
    }

    const subjects = this.subjectService.findAll();

    const filteredSubjects = subjects.filter(
      (subject) => subject.levelId === level.id,
    );

    return filteredSubjects.map<InterfaceLevelSubject>((subject) => ({
      subject,
      level,
    }));
  }
}
