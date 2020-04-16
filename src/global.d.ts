import 'reactn'
import {
  CartItemType,
  DeliveryMethodType,
  PaymentMethodType,
  OrderInfoType,
  LoginType,
  CreateLogin,
} from './utils/types'
// NOTE: changes here needs SERVER RESTART to apply changes

declare module 'reactn/default' {
  export interface Reducers {
    /* //example 
      append: (
      global: State,
      dispatch: Dispatch,
      ...strings: any[]
    ) => Pick<State, 'value'>;
 */
    changeCartItemAmount: (
      global: State,
      dispatch: Dispatch,
      index: number,
      newAmount: number,
    ) => Pick<State>

    removeFromCart: (
      global: State,
      dispatch: Dispatch,
      index: number,
    ) => Pick<State> //, 'cartInfo'

    getCart: (global: State, dispatch: Dispatch) => Pick<State> // 'cartItems'
    getDeliveryAndPay: (
      global: State,
      dispatch: Dispatch,
    ) => Pick<State, 'deliveryMethods', 'paymentMethods'>

    changeDeliveryMethod: (
      global: State,
      dispatch: Dispatch,
      delivery_id: number,
    ) => Pick<State>

    changePaymentMethod: (
      global: State,
      dispatch: Dispatch,
      payment_id: number,
    ) => Pick<State>

    fetchOrderInfo: (
      global: State,
      dispatch: Dispatch,
    ) => Pick<State, 'deliveryMethod', 'paymentMethod', 'addressName'> //previously just 'orderInfo'>

    saveAddressInfo: (
      global: State,
      dispatch: Dispatch,
      forms_data: object,
    ) => null

    submitOrder: (global: State, dispatch: Dispatch, forms_data: object) => null

    changeLang: (
      global: State,
      dispatch: Dispatch,
      lang: string,
      i18n: i18n,
    ) => null

    clearAllData: (global: State, dispatch: Dispatch) => null

    addRandomItem: (global: State, dispatch: Dispatch) => null

    createLogin: (
      global: State,
      dispatch: Dispatch,
      loginInfo: CreateLogin,
    ) => null

    login: (global: State, dispatch: Dispatch, loginInfo: LoginType) => null
  }

  // necessary to define due to typescript ability to safely read from useGlobal()
  type SumLine = {
    shipping: number
    paymentFee: number
    goodsSum: number
    sales: number
    total: number
  }
  export interface State {
    cartItems: Array<CartItemType>
    cartInfo: {
      noVat: SumLine
      vatIncl: SumLine
      vat: array
      notes: {
        shipping_note?: string
        paymentFee_note?: string
        sales_note?: string
      }
    }
    orderInfo: OrderInfoType
    deliveryMethods: Array<DeliveryMethodType>
    paymentMethods: Array<PaymentMethodType>
    selectedDelivery: number
    selectedPayment: number
    isSubmittingOrder: boolean
  }
}
