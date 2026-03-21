import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { InterfacePostSubject, InterfaceSubject } from './subject';
import { BddService } from '../bdd/bdd.service';
import { InterfaceLevelSubject } from '../level/level';
import { LevelService } from '../level/level.service';

@Injectable()
export class SubjectService {
  constructor(
    private bdd: BddService,
    @Inject(forwardRef(() => LevelService))
    private levelService: LevelService,
  ) {}

  findAll(): InterfaceSubject[] {
    return this.bdd.get<InterfaceSubject>('subjects');
  }

  findOneById(id: number): InterfaceSubject {
    return this.bdd.getById<InterfaceSubject>('subjects', id);
  }

  createNewSubject({ name }: InterfacePostSubject): InterfaceSubject[] {
    const sortedByIdSubjects = this.findAll().sort((a, b) => a.id - b.id);
    const newId = sortedByIdSubjects[sortedByIdSubjects.length - 1].id + 1;
    return [...this.findAll(), { id: newId, name: name, levelId: 1 }];
  }

  findSubjectAndLevelsFromName(name: string): InterfaceLevelSubject[] {
    const subject = this.findAll().find((s) => s.name === name);
    if (subject === undefined) {
      return [];
    }
    const levels = this.levelService.findAll();
    const filteredLevels = levels.filter((l) => l.id === subject.levelId);

    return filteredLevels.map<InterfaceLevelSubject>((level) => ({
      level,
      subject,
    }));
  }
}
