import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelEntity } from './entities/level.entity';
import { SubjectEntity } from '../subject/entities/subject.entity';
import { AddLevelDto } from './interfaces/addLevel.dto';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  findAll(): Promise<LevelEntity[]> {
    return this.levelService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: string): Promise<SubjectEntity> {
    return this.levelService.findOneById(+id); // cast en number
  }

  @Post()
  addSubject(@Body() level: AddLevelDto): Promise<LevelEntity> {
    return this.levelService.createNewLevel(level);
  }
}
