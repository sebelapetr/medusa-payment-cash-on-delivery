import { MigrationInterface, QueryRunner } from "typeorm";

export class CodChargeAllowMethod1708592861034 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "shipping_option"' + ' ADD COLUMN "allow_cod_payment_method" boolean  DEFAULT false'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "shipping_option" DROP COLUMN "allow_cod_payment_method"'
        );
    }
}
