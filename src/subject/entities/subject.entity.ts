import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LevelEntity } from '../../level/entities/level.entity';

@Entity()
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => LevelEntity, (level) => level.subject)
  level: LevelEntity;
}
