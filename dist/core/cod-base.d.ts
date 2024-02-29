import { AbstractPaymentProcessor, Cart, CartService, PaymentProcessorContext, PaymentProcessorError, PaymentService, PaymentSessionStatus, ShippingOptionService } from "@medusajs/medusa";
import { CashOnDeliveryPaymentOptions, CashOnDeliveryPaymentProcessorSessionResponse, CashOnDeliverySessionData } from "../types";
declare abstract class CashOnDeliveryBase extends AbstractPaymentProcessor {
    static identifier: string;
    protected readonly options_: CashOnDeliveryPaymentOptions;
    protected readonly cartService: CartService;
    protected readonly shippingOptionService: ShippingOptionService;
    protected readonly paymentService: PaymentService;
    protected constructor(_: any, options: any);
    getPaymentStatus(paymentSessionData: CashOnDeliverySessionData): Promise<PaymentSessionStatus>;
    initiatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse>;
    authorizePayment(paymentSessionData: CashOnDeliverySessionData, context?: Record<string, unknown>): Promise<PaymentProcessorError | {
        status: PaymentSessionStatus;
        data: CashOnDeliveryPaymentProcessorSessionResponse["session_data"];
    }>;
    cancelPayment(paymentSessionData: CashOnDeliverySessionData): Promise<PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse["session_data"]>;
    capturePayment(paymentSessionData: CashOnDeliverySessionData): Promise<PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse["session_data"]>;
    deletePayment(paymentSessionData: CashOnDeliverySessionData): Promise<PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse["session_data"]>;
    refundPayment(paymentSessionData: CashOnDeliverySessionData, refundAmount: number): Promise<PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse["session_data"]>;
    retrievePayment(paymentSessionData: CashOnDeliverySessionData): Promise<PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse["session_data"]>;
    updatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse | void>;
    updatePaymentData(sessionId: string, data: CashOnDeliverySessionData): Promise<CashOnDeliveryPaymentProcessorSessionResponse["session_data"] | PaymentProcessorError>;
    updateCodCharge(cart: Cart, includeCodCharge: boolean, paymentSession: CashOnDeliverySessionData): Promise<void>;
}
export default CashOnDeliveryBase;
