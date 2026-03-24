import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectModule } from './subject/subject.module';
import { LevelModule } from './level/level.module';
import { BddModule } from './bdd/bdd.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    SubjectModule,
    LevelModule,
    BddModule,
    ConfigModule.forRoot({ folder: './config' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
