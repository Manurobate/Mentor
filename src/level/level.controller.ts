import { Controller, Get, Param } from '@nestjs/common';
import { LevelService } from './level.service';
import type { InterfaceLevel, InterfaceLevelSubject } from './level';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  findAll(): InterfaceLevel[] {
    return this.levelService.findAll();
  }
  @Get('subject/:name')
  findLevelAndSubjectByName(
    @Param('name') name: string,
  ): InterfaceLevelSubject[] {
    return this.levelService.findLevelAndSubjectByName(name);
  }
}
