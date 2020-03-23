import 'reactn'
import { CartItemType, DeliveryMethodType } from './utils/types'
// NOTE: changes here needs SERVER RESTART to apply changes

declare module 'reactn/default' {
  export interface Reducers {
    /* //example 
      append: (
      global: State,
      dispatch: Dispatch,
      ...strings: any[]
    ) => Pick<State, 'value'>;

    increment: (
      global: State,
      dispatch: Dispatch,
      i: number,
    ) => Pick<State, 'count'>;
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

    getCart: (global: State, dispatch: Dispatch) => Pick<State, 'cartItems'>
    getDeliveryAndPay: (
      global: State,
      dispatch: Dispatch,
    ) => Pick<State, 'deliveryMethods', 'paymentMethods'>

    changeDeliveryMethod: (
      global: State,
      dispatch: Dispatch,
      delivery_id: number
    ) => Pick<State>
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
    deliveryMethods: Array<DeliveryMethodType>
    paymentMethods: []
  }
}
