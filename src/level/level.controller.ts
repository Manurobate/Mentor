import { Controller, Get, Param } from '@nestjs/common';
import { LevelService } from './level.service';
import type { InterfaceLevelSubject } from './level';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get('subject/:name')
  findLevelAndSubjectByName(
    @Param('name') name: string,
  ): InterfaceLevelSubject[] {
    return this.levelService.findLevelAndSubjectByName(name);
  }
}
