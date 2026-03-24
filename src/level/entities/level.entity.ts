import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectEntity } from '../../subject/entities/subject.entity';

@Entity()
export class LevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => SubjectEntity, (subject) => subject.level)
  subject: SubjectEntity;
}
