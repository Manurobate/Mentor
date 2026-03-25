import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectEntity } from '../../subject/entities/subject.entity';

@Entity()
export class LevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SubjectEntity, (subject) => subject.level)
  subjects: SubjectEntity[];
}
