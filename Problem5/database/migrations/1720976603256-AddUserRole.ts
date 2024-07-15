import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRole1720976603256 implements MigrationInterface {
  name = 'AddUserRole1720976603256';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `ALTER TABLE "resources" ADD "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', name)) STORED`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'crude-server',
        'public',
        'resources',
        'GENERATED_COLUMN',
        'search_vector',
        "to_tsvector('simple', name)",
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      [
        'GENERATED_COLUMN',
        'search_vector',
        'crude-server',
        'public',
        'resources',
      ],
    );
    await queryRunner.query(
      `ALTER TABLE "resources" DROP COLUMN "search_vector"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
