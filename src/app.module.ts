import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectModule } from './subject/subject.module';
import { LevelModule } from './level/level.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from './level/entities/level.entity';
import { SubjectEntity } from './subject/entities/subject.entity';

@Module({
  imports: [
    SubjectModule,
    LevelModule,
    ConfigModule.forRoot({ folder: './config' }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '192.168.1.100',
      port: 3306,
      username: 'mentor',
      password: 'azerty',
      database: 'mentor',
      entities: [SubjectEntity, LevelEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
