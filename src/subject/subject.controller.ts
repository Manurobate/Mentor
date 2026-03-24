import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { InterfacePostSubject, InterfaceSubject } from './subject';
import { SubjectService } from './subject.service';
import { InterfaceLevelSubject } from '../level/level';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  findAll(): InterfaceSubject[] {
    return this.subjectService.findAll();
  }

  @Get('favorite')
  findFavorite(): string {
    return this.subjectService.findFavorite();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): InterfaceSubject {
    return this.subjectService.findOneById(+id); // cast en number
  }

  @Get(':name/level')
  findSubjectAndLevels(@Param('name') name: string): InterfaceLevelSubject[] {
    return this.subjectService.findSubjectAndLevelsFromName(name);
  }

  @Post()
  addSubject(@Body() subject: InterfacePostSubject): InterfaceSubject[] {
    return this.subjectService.createNewSubject(subject);
  }
}
