export default async function () {
    const imports = (await import(
        "@medusajs/medusa/dist/api/routes/store/shipping-options/index"
        )) as any
    imports.allowedStoreShippingOptionsFields = [
        ...imports.allowedStoreShippingOptionsFields,
        "cod_charge_price",
        "allow_cod_payment_method",
    ]
    imports.defaultStoreShippingOptionsFields = [
        ...imports.defaultStoreShippingOptionsFields,
        "cod_charge_price",
        "allow_cod_payment_method",
    ]
}
