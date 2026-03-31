import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { InterfacePostSubject } from './subject';
import { SubjectService } from './subject.service';
import { SubjectEntity } from './entities/subject.entity';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  findAll(): Promise<SubjectEntity[]> {
    return this.subjectService.findAll();
  }

  @Get('favorite')
  findFavorite(): string {
    return this.subjectService.findFavorite();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<SubjectEntity | null> {
    return this.subjectService.findOneById(+id); // cast en number
  }

  // @Get(':name/level')
  // findSubjectAndLevels(
  //   @Param('name') name: string,
  // ): Promise<InterfaceLevelSubject | null> {
  //   return this.subjectService.findSubjectAndLevelsFromName(name);
  // }

  @Post()
  addSubject(@Body() subject: InterfacePostSubject): Promise<SubjectEntity> {
    return this.subjectService.createNewSubject(subject);
  }
}
