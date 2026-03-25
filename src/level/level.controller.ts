import { Controller, Get, Param } from '@nestjs/common';
import { LevelService } from './level.service';
import type { InterfaceLevelSubjects } from './level';
import { LevelEntity } from './entities/level.entity';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  findAll(): Promise<LevelEntity[]> {
    return this.levelService.findAll();
  }
  @Get('subjects/:name')
  findLevelAndSubjectByName(
    @Param('name') name: string,
  ): Promise<InterfaceLevelSubjects | null> {
    return this.levelService.findLevelAndSubjectByName(name);
  }
}
