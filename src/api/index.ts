import { registerOverriddenValidators } from '@medusajs/medusa';
import {IsOptional, IsString, IsBoolean} from 'class-validator';
import { AdminPostShippingOptionsOptionReq as MedusaAdminPostShippingOptionsOptionReq } from '@medusajs/medusa/dist/api/routes/admin/shipping-options/update-shipping-option';

class AdminPostShippingOptionsOptionReq extends MedusaAdminPostShippingOptionsOptionReq {
    @IsString()
    @IsOptional()
    cod_charge_price?: number | null;

    @IsBoolean()
    allow_cod_payment_method: boolean;
}

registerOverriddenValidators(AdminPostShippingOptionsOptionReq);
