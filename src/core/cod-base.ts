import {
  AbstractPaymentProcessor, Cart,
  CartService,
  PaymentProcessorContext,
  PaymentProcessorError, PaymentService,
  PaymentSessionStatus,
  ShippingOptionService,
} from "@medusajs/medusa";

import {
  CashOnDeliveryPaymentOptions,
  CashOnDeliveryPaymentProcessorSessionResponse,
  CashOnDeliverySessionData,
  PaymentProviderKeys
} from "../types";

import { ShippingOption as MedusaShippingOption } from "@medusajs/medusa";

type ShippingOption = {
  cod_charge_price?: number | null;
  allow_cod_payment_method: boolean;
} & MedusaShippingOption;

abstract class CashOnDeliveryBase extends AbstractPaymentProcessor {
  static identifier = PaymentProviderKeys.COD;

  protected readonly options_: CashOnDeliveryPaymentOptions;
  protected readonly cartService: CartService;
  protected readonly shippingOptionService: ShippingOptionService;
  protected readonly paymentService: PaymentService;

  protected constructor(_, options) {
    super(_, options);
    this.options_ = options;
    this.cartService = _.cartService;
    this.shippingOptionService = _.shippingOptionService;
  }

  async getPaymentStatus(paymentSessionData: CashOnDeliverySessionData
  ): Promise<PaymentSessionStatus> {
    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "getPaymentStatus", "start")
    }

    const paymentStatus = paymentSessionData.status;

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "getPaymentStatus", "data: ", {
        paymentStatus
      })
    }

    return paymentStatus;
  }

  async initiatePayment(
    context: PaymentProcessorContext
  ): Promise<PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse> {

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "initiatePayment", "start")
    }

    const cartId = context.resource_id;

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "context: ", context)
      console.log("CashOnDelivery: " + "cartId: ", cartId)
    }

    const session_data: CashOnDeliverySessionData = {
      status: PaymentSessionStatus.PENDING,
      cartId: cartId
    };

    const cart = await this.cartService.retrieveWithTotals(cartId);

    if (cart) {
      await this.updateCodCharge(cart, false, session_data);
    }

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "initiatePayment", "session_data: ", session_data)
    }

    return {
      session_data: session_data
    };
  }

  async authorizePayment(
    paymentSessionData: CashOnDeliverySessionData,
    context?: Record<string, unknown>
  ): Promise<
    | PaymentProcessorError
    | {
        status: PaymentSessionStatus;
        data: CashOnDeliveryPaymentProcessorSessionResponse["session_data"];
      }
  > {

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "authorizePayment", "start")
    }

    const transactionStatus = PaymentSessionStatus.AUTHORIZED;

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "authorizePayment", "transactionStatus: ", transactionStatus)
    }


    const sessionData = {
      status: transactionStatus,
      data: {
        status: transactionStatus,
        cartId: paymentSessionData.cartId
      }
    }

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "authorizePayment", "sessionData: ", sessionData)
    }

    return sessionData;
  }

  async cancelPayment(
    paymentSessionData: CashOnDeliverySessionData
  ): Promise<
    PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse["session_data"]
  > {

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "cancelPayment", "start")
    }

    return {
      status: PaymentSessionStatus.CANCELED,
      cartId: paymentSessionData.cartId
    }
  }

  async capturePayment(
    paymentSessionData: CashOnDeliverySessionData
  ): Promise<
    PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse["session_data"]
  > {
    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "capturePayment", "start")
    }

    return {
      status: PaymentSessionStatus.AUTHORIZED,
      cartId: paymentSessionData.cartId
    }
  }

  async deletePayment(
    paymentSessionData: CashOnDeliverySessionData
  ): Promise<
    PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse["session_data"]
  > {
    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "deletePayment", "start")
    }

    const cart = await this.cartService.retrieveWithTotals(paymentSessionData.cartId);

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "deletePayment", "cart: ", cart)
    }

    const canceledPayment = await this.cancelPayment(paymentSessionData);

    if (cart) {
      await this.updateCodCharge(cart, false, paymentSessionData);
    }

    return canceledPayment
  }

  async refundPayment(
    paymentSessionData: CashOnDeliverySessionData,
    refundAmount: number
  ): Promise<
    PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse["session_data"]
  > {
    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "refundPayment", "start")
    }

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "refundPayment", "amount: ", String(refundAmount))
    }

    return {
      status: paymentSessionData.status,
      cartId: paymentSessionData.cartId
    };
  }

  async retrievePayment(
    paymentSessionData: CashOnDeliverySessionData
  ): Promise<
    PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse["session_data"]
  > {
    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "retrievePayment", "start")
    }

    return {
      status: PaymentSessionStatus.AUTHORIZED,
      cartId: paymentSessionData.cartId
    };
  }

  async updatePayment(
    context: PaymentProcessorContext
  ): Promise<PaymentProcessorError | CashOnDeliveryPaymentProcessorSessionResponse | void> {

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "updatePayment", "start")
    }

    const cartId = context.resource_id;
    const cart = await this.cartService.retrieveWithTotals(cartId);

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "context: ", context)
      console.log("CashOnDelivery: " + "cartId: ", cartId)
      console.log("CashOnDelivery: " + "cart: ", cart)
    }
    const paymentSessionData = await context.paymentSessionData as CashOnDeliverySessionData;

    if (cart) {
      await this.updateCodCharge(cart, true, paymentSessionData)
    }

    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "updatePayment", "paymentSessionData: ", paymentSessionData)
    }

    return {
      session_data: paymentSessionData
    };
  }

  async updatePaymentData(
    sessionId: string,
    data: CashOnDeliverySessionData
  ): Promise<
    CashOnDeliveryPaymentProcessorSessionResponse["session_data"] | PaymentProcessorError
  > {
    if (this.options_.debug) {
      console.log("CashOnDelivery: " + "updatePaymentData", "start")
      console.log("CashOnDelivery: " + "updatePaymentData", "data: ", data)
    }
    return data;
  }

  async updateCodCharge(
      cart: Cart,
      includeCodCharge: boolean,
      paymentSession: CashOnDeliverySessionData
  ) {
    if (cart) {
      try {
        const shippingMethods = cart.shipping_methods;
        if (this.options_.debug) {
          console.log("CashOnDelivery: " + "shippingMethods: ", shippingMethods)
        }
        await Promise.all(
          shippingMethods.map(async (method) => {
            const methodOptionId = method.shipping_option_id;
            const shippingOption = await this.shippingOptionService.retrieve(methodOptionId) as ShippingOption;
            if (shippingOption) {
              if (this.options_.debug) {
                console.log("CashOnDelivery: " + "sho", shippingOption)
                console.log("CashOnDelivery: " + "cart", cart)
                console.log("CashOnDelivery: " + "cartps", paymentSession)
                console.log(shippingOption.allow_cod_payment_method == false && paymentSession)
              }
              if (shippingOption.allow_cod_payment_method == false && paymentSession) {

                if (this.options_.debug) {
                  console.log("CashOnDelivery: " + "updateCodCharge", "Deleting payment session")
                }
                //await this.deletePayment(paymentSession as CashOnDeliverySessionData);
                //return;
              }
              if (this.options_.debug) {
                console.log("CashOnDelivery: " + "shippingOption: ", shippingOption)
              }
              if (shippingOption.cod_charge_price) {
                if (this.options_.debug) {
                  console.log("CashOnDelivery: " + "cod_charge_price: ", shippingOption.cod_charge_price)
                }
                let shippingPrice;
                if (includeCodCharge) {
                  shippingPrice = (shippingOption.amount ?? 0) + (shippingOption.cod_charge_price ?? 0);
                  if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "shippingPrice: ", shippingPrice)
                  }
                  const updatedShippingMethod = await this.shippingOptionService.updateShippingMethod(method.id, {
                    price: shippingPrice,
                    data: {
                      ...method.data,
                      shippingPrice: shippingOption.amount ?? 0,
                      codChargePrice: shippingOption.cod_charge_price
                    }
                  })
                  if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "initiatePayment", "updatedShippingMethod: ", updatedShippingMethod)
                  }
                } else {
                  shippingPrice = shippingOption.amount;
                  if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "shippingPrice: ", shippingPrice)
                  }
                  const methodData = method.data;
                  delete methodData.shippingPrice;
                  delete methodData.codChargePrice;
                  const updatedShippingMethod = await this.shippingOptionService.updateShippingMethod(method.id, {
                    price: shippingPrice,
                    data: methodData
                  })
                  if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "initiatePayment", "updatedShippingMethod: ", updatedShippingMethod)
                  }
                }
              }
            }
          })
        )
      } catch (e) {
        if (this.options_.debug) {
          console.log("CashOnDelivery: " + "initiatePayment", "Error in updating cart: ", e.toString())
        }
      }
    }
  }
}

export default CashOnDeliveryBase;
