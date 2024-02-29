"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var medusa_1 = require("@medusajs/medusa");
var types_1 = require("../types");
var CashOnDeliveryBase = /** @class */ (function (_super) {
    __extends(CashOnDeliveryBase, _super);
    function CashOnDeliveryBase(_, options) {
        var _this = _super.call(this, _, options) || this;
        _this.options_ = options;
        _this.cartService = _.cartService;
        _this.shippingOptionService = _.shippingOptionService;
        return _this;
    }
    CashOnDeliveryBase.prototype.getPaymentStatus = function (paymentSessionData) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentStatus;
            return __generator(this, function (_a) {
                if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "getPaymentStatus", "start");
                }
                paymentStatus = paymentSessionData.status;
                if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "getPaymentStatus", "data: ", {
                        paymentStatus: paymentStatus
                    });
                }
                return [2 /*return*/, paymentStatus];
            });
        });
    };
    CashOnDeliveryBase.prototype.initiatePayment = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var cartId, session_data, cart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.options_.debug) {
                            console.log("CashOnDelivery: " + "initiatePayment", "start");
                        }
                        cartId = context.resource_id;
                        if (this.options_.debug) {
                            console.log("CashOnDelivery: " + "context: ", context);
                            console.log("CashOnDelivery: " + "cartId: ", cartId);
                        }
                        session_data = {
                            status: medusa_1.PaymentSessionStatus.PENDING,
                            cartId: cartId
                        };
                        return [4 /*yield*/, this.cartService.retrieveWithTotals(cartId)];
                    case 1:
                        cart = _a.sent();
                        if (!cart) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateCodCharge(cart, false, session_data)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (this.options_.debug) {
                            console.log("CashOnDelivery: " + "initiatePayment", "session_data: ", session_data);
                        }
                        return [2 /*return*/, {
                                session_data: session_data
                            }];
                }
            });
        });
    };
    CashOnDeliveryBase.prototype.authorizePayment = function (paymentSessionData, context) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionStatus, sessionData;
            return __generator(this, function (_a) {
                if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "authorizePayment", "start");
                }
                transactionStatus = medusa_1.PaymentSessionStatus.AUTHORIZED;
                if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "authorizePayment", "transactionStatus: ", transactionStatus);
                }
                sessionData = {
                    status: transactionStatus,
                    data: {
                        status: transactionStatus,
                        cartId: paymentSessionData.cartId
                    }
                };
                if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "authorizePayment", "sessionData: ", sessionData);
                }
                return [2 /*return*/, sessionData];
            });
        });
    };
    CashOnDeliveryBase.prototype.cancelPayment = function (paymentSessionData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "cancelPayment", "start");
                }
                return [2 /*return*/, {
                        status: medusa_1.PaymentSessionStatus.CANCELED,
                        cartId: paymentSessionData.cartId
                    }];
            });
        });
    };
    CashOnDeliveryBase.prototype.capturePayment = function (paymentSessionData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "capturePayment", "start");
                }
                return [2 /*return*/, {
                        status: medusa_1.PaymentSessionStatus.AUTHORIZED,
                        cartId: paymentSessionData.cartId
                    }];
            });
        });
    };
    CashOnDeliveryBase.prototype.deletePayment = function (paymentSessionData) {
        return __awaiter(this, void 0, void 0, function () {
            var cart, canceledPayment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.options_.debug) {
                            console.log("CashOnDelivery: " + "deletePayment", "start");
                        }
                        return [4 /*yield*/, this.cartService.retrieveWithTotals(paymentSessionData.cartId)];
                    case 1:
                        cart = _a.sent();
                        if (this.options_.debug) {
                            console.log("CashOnDelivery: " + "deletePayment", "cart: ", cart);
                        }
                        return [4 /*yield*/, this.cancelPayment(paymentSessionData)];
                    case 2:
                        canceledPayment = _a.sent();
                        if (!cart) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.updateCodCharge(cart, false, paymentSessionData)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, canceledPayment];
                }
            });
        });
    };
    CashOnDeliveryBase.prototype.refundPayment = function (paymentSessionData, refundAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "refundPayment", "start");
                }
                if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "refundPayment", "amount: ", String(refundAmount));
                }
                return [2 /*return*/, {
                        status: paymentSessionData.status,
                        cartId: paymentSessionData.cartId
                    }];
            });
        });
    };
    CashOnDeliveryBase.prototype.retrievePayment = function (paymentSessionData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "retrievePayment", "start");
                }
                return [2 /*return*/, {
                        status: medusa_1.PaymentSessionStatus.AUTHORIZED,
                        cartId: paymentSessionData.cartId
                    }];
            });
        });
    };
    CashOnDeliveryBase.prototype.updatePayment = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var cartId, cart, paymentSessionData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.options_.debug) {
                            console.log("CashOnDelivery: " + "updatePayment", "start");
                        }
                        cartId = context.resource_id;
                        return [4 /*yield*/, this.cartService.retrieveWithTotals(cartId)];
                    case 1:
                        cart = _a.sent();
                        if (this.options_.debug) {
                            console.log("CashOnDelivery: " + "context: ", context);
                            console.log("CashOnDelivery: " + "cartId: ", cartId);
                            console.log("CashOnDelivery: " + "cart: ", cart);
                        }
                        return [4 /*yield*/, context.paymentSessionData];
                    case 2:
                        paymentSessionData = _a.sent();
                        if (!cart) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.updateCodCharge(cart, true, paymentSessionData)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (this.options_.debug) {
                            console.log("CashOnDelivery: " + "updatePayment", "paymentSessionData: ", paymentSessionData);
                        }
                        return [2 /*return*/, {
                                session_data: paymentSessionData
                            }];
                }
            });
        });
    };
    CashOnDeliveryBase.prototype.updatePaymentData = function (sessionId, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.options_.debug) {
                    console.log("CashOnDelivery: " + "updatePaymentData", "start");
                    console.log("CashOnDelivery: " + "updatePaymentData", "data: ", data);
                }
                return [2 /*return*/, data];
            });
        });
    };
    CashOnDeliveryBase.prototype.updateCodCharge = function (cart, includeCodCharge, paymentSession) {
        return __awaiter(this, void 0, void 0, function () {
            var shippingMethods, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!cart) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        shippingMethods = cart.shipping_methods;
                        if (this.options_.debug) {
                            console.log("CashOnDelivery: " + "shippingMethods: ", shippingMethods);
                        }
                        return [4 /*yield*/, Promise.all(shippingMethods.map(function (method) { return __awaiter(_this, void 0, void 0, function () {
                                var methodOptionId, shippingOption, shippingPrice, updatedShippingMethod, methodData, updatedShippingMethod;
                                var _a, _b, _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            methodOptionId = method.shipping_option_id;
                                            return [4 /*yield*/, this.shippingOptionService.retrieve(methodOptionId)];
                                        case 1:
                                            shippingOption = _d.sent();
                                            if (!shippingOption) return [3 /*break*/, 5];
                                            if (this.options_.debug) {
                                                console.log("CashOnDelivery: " + "sho", shippingOption);
                                                console.log("CashOnDelivery: " + "cart", cart);
                                                console.log("CashOnDelivery: " + "cartps", paymentSession);
                                                console.log(shippingOption.allow_cod_payment_method == false && paymentSession);
                                            }
                                            if (shippingOption.allow_cod_payment_method == false && paymentSession) {
                                                if (this.options_.debug) {
                                                    console.log("CashOnDelivery: " + "updateCodCharge", "Deleting payment session");
                                                }
                                                //await this.deletePayment(paymentSession as CashOnDeliverySessionData);
                                                //return;
                                            }
                                            if (this.options_.debug) {
                                                console.log("CashOnDelivery: " + "shippingOption: ", shippingOption);
                                            }
                                            if (!shippingOption.cod_charge_price) return [3 /*break*/, 5];
                                            if (this.options_.debug) {
                                                console.log("CashOnDelivery: " + "cod_charge_price: ", shippingOption.cod_charge_price);
                                            }
                                            shippingPrice = void 0;
                                            if (!includeCodCharge) return [3 /*break*/, 3];
                                            shippingPrice = ((_a = shippingOption.amount) !== null && _a !== void 0 ? _a : 0) + ((_b = shippingOption.cod_charge_price) !== null && _b !== void 0 ? _b : 0);
                                            if (this.options_.debug) {
                                                console.log("CashOnDelivery: " + "shippingPrice: ", shippingPrice);
                                            }
                                            return [4 /*yield*/, this.shippingOptionService.updateShippingMethod(method.id, {
                                                    price: shippingPrice,
                                                    data: __assign(__assign({}, method.data), { shippingPrice: (_c = shippingOption.amount) !== null && _c !== void 0 ? _c : 0, codChargePrice: shippingOption.cod_charge_price })
                                                })];
                                        case 2:
                                            updatedShippingMethod = _d.sent();
                                            if (this.options_.debug) {
                                                console.log("CashOnDelivery: " + "initiatePayment", "updatedShippingMethod: ", updatedShippingMethod);
                                            }
                                            return [3 /*break*/, 5];
                                        case 3:
                                            shippingPrice = shippingOption.amount;
                                            if (this.options_.debug) {
                                                console.log("CashOnDelivery: " + "shippingPrice: ", shippingPrice);
                                            }
                                            methodData = method.data;
                                            delete methodData.shippingPrice;
                                            delete methodData.codChargePrice;
                                            return [4 /*yield*/, this.shippingOptionService.updateShippingMethod(method.id, {
                                                    price: shippingPrice,
                                                    data: methodData
                                                })];
                                        case 4:
                                            updatedShippingMethod = _d.sent();
                                            if (this.options_.debug) {
                                                console.log("CashOnDelivery: " + "initiatePayment", "updatedShippingMethod: ", updatedShippingMethod);
                                            }
                                            _d.label = 5;
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (this.options_.debug) {
                            console.log("CashOnDelivery: " + "initiatePayment", "Error in updating cart: ", e_1.toString());
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CashOnDeliveryBase.identifier = types_1.PaymentProviderKeys.COD;
    return CashOnDeliveryBase;
}(medusa_1.AbstractPaymentProcessor));
exports.default = CashOnDeliveryBase;
//# sourceMappingURL=cod-base.js.map