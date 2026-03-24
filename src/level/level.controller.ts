import { Controller, Get, Param } from '@nestjs/common';
import { LevelService } from './level.service';
import type { InterfaceLevelSubject } from './level';
import { LevelEntity } from './entities/level.entity';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  findAll(): Promise<LevelEntity[]> {
    return this.levelService.findAll();
  }
  @Get('subject/:name')
  findLevelAndSubjectByName(
    @Param('name') name: string,
  ): Promise<InterfaceLevelSubject | null> {
    return this.levelService.findLevelAndSubjectByName(name);
  }
}
