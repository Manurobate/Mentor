import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { InterfacePostSubject, InterfaceSubject } from './subject';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  findAll(): InterfaceSubject[] {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): InterfaceSubject {
    return this.subjectService.findOneById(+id); // cast en number
  }

  @Post()
  addSubject(@Body() subject: InterfacePostSubject): InterfaceSubject[] {
    return this.subjectService.createNewSubject(subject);
  }
}
