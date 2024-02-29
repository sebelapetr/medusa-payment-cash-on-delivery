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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var medusa_1 = require("@medusajs/medusa");
var class_validator_1 = require("class-validator");
var update_shipping_option_1 = require("@medusajs/medusa/dist/api/routes/admin/shipping-options/update-shipping-option");
var AdminPostShippingOptionsOptionReq = /** @class */ (function (_super) {
    __extends(AdminPostShippingOptionsOptionReq, _super);
    function AdminPostShippingOptionsOptionReq() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Object)
    ], AdminPostShippingOptionsOptionReq.prototype, "cod_charge_price", void 0);
    __decorate([
        (0, class_validator_1.IsBoolean)(),
        __metadata("design:type", Boolean)
    ], AdminPostShippingOptionsOptionReq.prototype, "allow_cod_payment_method", void 0);
    return AdminPostShippingOptionsOptionReq;
}(update_shipping_option_1.AdminPostShippingOptionsOptionReq));
(0, medusa_1.registerOverriddenValidators)(AdminPostShippingOptionsOptionReq);
//# sourceMappingURL=index.js.map