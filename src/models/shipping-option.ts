import { Column, Entity } from 'typeorm';
import {
    ShippingOption as MedusaShippingOption,
} from '@medusajs/medusa';

@Entity()
export class ShippingOption extends MedusaShippingOption {
    @Column({ type: 'integer', nullable: true })
    cod_charge_price: number | null

    @Column({ type: 'boolean', default: false })
    allow_cod_payment_method: boolean
}
