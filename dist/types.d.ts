import { PaymentProcessorSessionResponse, PaymentSessionStatus } from "@medusajs/medusa";
export interface CashOnDeliveryPaymentOptions {
    debug: boolean;
}
export declare const PaymentProviderKeys: {
    COD: string;
};
export type CashOnDeliveryPaymentProcessorSessionResponse = Omit<PaymentProcessorSessionResponse, 'session_data'> & {
    session_data: CashOnDeliverySessionData;
};
export type CashOnDeliverySessionData = {
    status: PaymentSessionStatus;
    cartId: string;
};
