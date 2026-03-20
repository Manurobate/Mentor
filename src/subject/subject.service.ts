import { Injectable } from '@nestjs/common';
import type { InterfacePostSubject, InterfaceSubject } from './subject';
import { SUBJECTS } from './bdd';

@Injectable()
export class SubjectService {
  findOneById(id: number): InterfaceSubject {
    return <InterfaceSubject>SUBJECTS.find((subject) => subject.id === id);
  }

  createNewSubject({ name }: InterfacePostSubject): InterfaceSubject[] {
    const sortedByIdSubjects = SUBJECTS.sort((a, b) => a.id - b.id);
    const newId = sortedByIdSubjects[sortedByIdSubjects.length - 1].id + 1;
    return [...SUBJECTS, { id: newId, name: name }];
  }
}
