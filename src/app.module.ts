import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectModule } from './subject/subject.module';
import { LevelModule } from './level/level.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './database/ormconfig';
import { CacheModule } from '@nestjs/cache-manager';
import { AnnounceModule } from './announce/announce.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SubjectModule,
    LevelModule,
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    ConfigModule.forRoot({
      envFilePath: './config/.env',
      isGlobal: true,
    }),
    CacheModule.register(),
    AnnounceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
