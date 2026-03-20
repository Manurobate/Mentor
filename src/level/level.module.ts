import { Module } from '@nestjs/common';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [SubjectModule],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
