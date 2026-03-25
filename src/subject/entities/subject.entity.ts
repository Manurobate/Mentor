import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LevelEntity } from '../../level/entities/level.entity';

@Entity()
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => LevelEntity, (level) => level.subjects)
  @JoinColumn()
  level: LevelEntity;
}
