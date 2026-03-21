import { forwardRef, Module } from '@nestjs/common';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [forwardRef(() => SubjectModule)],
  controllers: [LevelController],
  providers: [LevelService],
  exports: [LevelService],
})
export class LevelModule {}
