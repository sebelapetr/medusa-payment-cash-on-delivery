import CodBase from "../core/cod-base";
import { PaymentProviderKeys } from "../types";

class CashOnDeliveryProviderService extends CodBase {
  static identifier = PaymentProviderKeys.COD;

  constructor(_, options) {
    super(_, options);
  }
}

export default CashOnDeliveryProviderService;
