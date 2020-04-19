export const CartItemTypeObj = {
  product_id: 1, //example of typeof; eg. 1 is number, 'a' is string
  variant_attr1: 'a',
  variant_attr2: 'a',
  name: 'a',
  amount: 1,
  price: 1,
  is_online: true,
  is_one_piece: true,
}
export type CartItemType = typeof CartItemTypeObj

export const CartTypeObj = {
  noVat: {},
  vatIncl: {},
  vat: {},
  notes: {},
}
export type CartType = typeof CartTypeObj

export const DeliveryMethod = {
  delivery_id: 1,
  name: 'a',
  payments: 'a', //[] //TODO at BE remake to array
  require_address: true,
  price: 1,
  personal_pickup: 'a',
  description: 'a',
  is_online: true,
}
//export type DeliveryMethodTypeIncl = typeof DeliveryMethod
//type EE = { payments: Array<number> }
//export type DeliveryMethodType = DeliveryMethodTypeIncl & EE
export type DeliveryMethodType = typeof DeliveryMethod

export const PaymentMethod = {
  payment_id: 1,
  name: 'a',
  price: 1,
  //description
  //bank_transfer
  //pay_before
}
export type PaymentMethodType = typeof PaymentMethod
export const FormPart = {
  data: {},
  name: 'a',
  dataValid: true,
}
export type FormPartType = typeof FormPart

export type FormPartsType = {
  personal?: FormPartType
  delivery?: FormPartType
  invoice?: FormPartType
  company?: FormPartType
}

export type DeliveryInfoType = {
  personal?: object
  delivery?: object
  invoice?: object
  company?: object
}
export type termsConditions = {
  url?: string
  class?: string
  rel?: string
  content?: string
  target?: string
  label?: string
  clickable?: string
}
export type OrderInfoType = {
  paymentMethod: number
  deliveryMethod: number
  addressName: DeliveryInfoType
  terms: termsConditions
}

export type LoginType = {
  email: string
  pwd: string
}
export type CreateLogin = {
  name: string
  email: string
  pwd: string
  pwd2: string
}
export type RegUserType = {
  logged: string | boolean
  name: string
  res?: string
  err_code?: string
}
