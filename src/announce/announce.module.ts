import { Module } from '@nestjs/common';
import { AnnounceController } from './announce.controller';
import { AnnounceService } from './announce.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnounceEntity } from './entities/announce.entity';
import { LevelModule } from '../level/level.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  controllers: [AnnounceController],
  providers: [AnnounceService],
  imports: [
    TypeOrmModule.forFeature([AnnounceEntity]),
    LevelModule,
    SubjectModule,
  ],
})
export class AnnounceModule {}
