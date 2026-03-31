import { SubjectEntity } from '../subject/entities/subject.entity';
import { LevelEntity } from '../level/entities/level.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AnnounceEntity } from '../announce/entities/announce.entity';

const options: DataSourceOptions = {
  type: 'mariadb',
  host: '192.168.1.100',
  port: 3306,
  username: 'mentor',
  password: 'azerty',
  database: 'mentor',
  entities: [SubjectEntity, LevelEntity, AnnounceEntity],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...options,
};

export const connectionSource = new DataSource({
  ...options,
  migrations: ['dist/database/migrations/*.js'],
});
