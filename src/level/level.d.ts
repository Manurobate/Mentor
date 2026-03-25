import { InterfaceSubject } from '../subject/subject';

export type InterfaceLevel = {
  id: number;
  name: string;
};

export type InterfaceLevelSubject = {
  level: InterfaceLevel;
  subject: InterfaceSubject;
};

export type InterfaceLevelSubjects = {
  level: InterfaceLevel;
  subjects: InterfaceSubject[];
};
