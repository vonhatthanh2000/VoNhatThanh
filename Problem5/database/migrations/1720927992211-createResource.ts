import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateResource1720927992211 implements MigrationInterface {
  name = 'CreateResource1720927992211';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."resources_type_enum" AS ENUM('video', 'image', 'audio', 'document', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "resources" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" "public"."resources_type_enum" NOT NULL DEFAULT 'video', "created_by_id" uuid NOT NULL, CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "resources" ADD CONSTRAINT "FK_08a6953a0afd84b04e3560ceb22" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "resources" DROP CONSTRAINT "FK_08a6953a0afd84b04e3560ceb22"`,
    );
    await queryRunner.query(`DROP TABLE "resources"`);
    await queryRunner.query(`DROP TYPE "public"."resources_type_enum"`);
  }
}
