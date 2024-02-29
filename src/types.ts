import {
  PaymentProcessorSessionResponse,
  PaymentSessionStatus
} from "@medusajs/medusa";

export interface CashOnDeliveryPaymentOptions {
  debug: boolean
}

export const PaymentProviderKeys = {
  COD: "cash-on-delivery",
};

export type CashOnDeliveryPaymentProcessorSessionResponse = Omit<PaymentProcessorSessionResponse, 'session_data'> & {
  session_data: CashOnDeliverySessionData;
};

export type CashOnDeliverySessionData = {
  status: PaymentSessionStatus,
  cartId: string
}

