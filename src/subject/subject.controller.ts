import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectEntity } from './entities/subject.entity';
import { AddSubjectDto } from './interfaces/addSubject.dto';

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
  findOneById(@Param('id', ParseIntPipe) id: string): Promise<SubjectEntity> {
    return this.subjectService.findOneById(+id); // cast en number
  }

  @Post()
  addSubject(@Body() subject: AddSubjectDto): Promise<SubjectEntity> {
    return this.subjectService.createNewSubject(subject);
  }
}
