import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToUser1775574427439 implements MigrationInterface {
    name = 'AddRoleToUser1775574427439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD \`role\` enum ('student', 'teacher', 'admin') NOT NULL DEFAULT 'admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP COLUMN \`role\``);
    }

}
