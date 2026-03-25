import { MigrationInterface, QueryRunner } from 'typeorm';
import { formatStringToSql, initLevels, initSubjects } from '../data';

export class SeedData1774459381452 implements MigrationInterface {
  name = 'SeedData1774459381452';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const level of initLevels) {
      await queryRunner.query(
        `INSERT INTO level_entity (name) VALUES (${formatStringToSql(level.name)})`,
      );
    }
    for (const subject of initSubjects) {
      await queryRunner.query(
        `INSERT INTO subject_entity (name, levelId) VALUES (${formatStringToSql(subject.name)}, ${subject.levelId})`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM subject_entity');
    await queryRunner.query('DELETE FROM level_entity');
  }
}
