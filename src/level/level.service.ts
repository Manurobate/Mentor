import { Inject, Injectable } from '@nestjs/common';
import type { InterfaceLevel, InterfaceLevelSubject } from './level';
import { BddService } from '../bdd/bdd.service';
import { InterfaceSubject } from '../subject/subject';
import { TOKEN_SUBJECTS } from '../bdd/constantes';

@Injectable()
export class LevelService {
  constructor(
    @Inject(TOKEN_SUBJECTS) private bddSubjects: InterfaceSubject[],
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

    const filteredSubjects = this.bddSubjects.filter(
      (subject) => subject.levelId === level.id,
    );

    return filteredSubjects.map<InterfaceLevelSubject>((subject) => ({
      subject,
      level,
    }));
  }
}
