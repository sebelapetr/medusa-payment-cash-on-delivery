import { MigrationInterface, QueryRunner } from "typeorm";

export class CodCharge1708592761034 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "shipping_option"' + ' ADD COLUMN "cod_charge_price" integer'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "shipping_option" DROP COLUMN "cod_charge_price"'
        );
    }
}
