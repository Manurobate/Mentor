import { Injectable } from '@nestjs/common';
import type { InterfaceLevelSubject } from './level';
import { SubjectService } from '../subject/subject.service';
import { LEVELS } from './bdd';

@Injectable()
export class LevelService {
  constructor(private readonly subjectService: SubjectService) {}

  findLevelAndSubjectByName(name: string): InterfaceLevelSubject[] {
    const level = LEVELS.find((l) => l.name === name);

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
