export const CartItemTypeObj = {
  product_id: 1, //example of typeof; eg. 1 is number, 'a' is string
  variant_attr1: 'a',
  variant_attr2: 'a',
  name: 'a',
  amount: 1,
  price: 1,
  is_online: true,
  is_one_piece: true,
  warning: 'a',
  exceededCapacity: true,
  measure: 'a',
  product_type: 'a',
  online_pay_from: 1,
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
  enabled: true,
  //require_specification: true,
  specification_type: 'a',
  product_type: 'a',
}
//export type DeliveryMethodTypeIncl = typeof DeliveryMethod
//type EE = { payments: Array<number> }
//export type DeliveryMethodType = DeliveryMethodTypeIncl & EE
export type DeliveryMethodType = typeof DeliveryMethod

export const PaymentMethod = {
  payment_id: 1,
  name: 'a',
  price: 1,
  online_pay: true,
  enabled: true,
  bank_transfer: true,
  account: 1,
  pay_at_takeover: true,
  only_free_of_charge: true,
  product_type: 'a',
  pay_individual: true,
  money_transfer: true,
  online: true,
  //description
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
  agree?: FormPartType
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
  onlinePayURL: string
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
export enum OrderCompletedScreen {
  //BankTransfer,
  //PersonalPay,
  SuccessScreen,
  OnlinePaySucces,
  OnlinePayFail,
  PaymentResult,
}
export type SubmittedOrderData = {
  status: string
  newOrderId: number
  newOrderNumber: string
  postOrderInstructions: any
  orderData: {
    cena_objednavky: number
    doruc_adr_json: { street: string; city: string; zip: string }
  }
}
export enum ApiCallStatus {
  Nothing,
  Pending,
  Fetched,
  Error,
}
export type ZasilkovnaSearchRes = {
  id: number
  name: string
  special: string
  place: string
  street: string
  city: string
  psc: string
  zip: string
  country: string
  url: string
  lat: string
  lon: string
  opening: string
  directions: string
}
export type PickupPlaceDetailType = ZasilkovnaSearchRes

export type DeliverySpecs = {
  label: string
  data: string
}
export type PaymentResultType = {
  test: boolean
  price: string
  curr: string
  status: string
  fee: string
  error?: {}
}
