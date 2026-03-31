import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubjectEntity } from '../../subject/entities/subject.entity';
import { LevelEntity } from '../../level/entities/level.entity';

@Entity()
export class AnnounceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToOne(() => SubjectEntity, (subject) => subject.announces)
  @JoinColumn()
  subject: SubjectEntity;

  @ManyToOne(() => LevelEntity, (level) => level.announces)
  @JoinColumn()
  level: LevelEntity;
}
