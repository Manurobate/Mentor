import { forwardRef, Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { LevelModule } from '../level/level.module';

@Module({
  imports: [forwardRef(() => LevelModule)],
  exports: [SubjectService],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
