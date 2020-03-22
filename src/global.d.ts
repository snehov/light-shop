import 'reactn'
import { CartItemType } from './utils/types'
// NOTE: changes here needs SERVER RESTART to apply changes

declare module 'reactn/default' {
  export interface Reducers {
    /*   append: (
      global: State,
      dispatch: Dispatch,
      ...strings: any[]
    ) => Pick<State, 'value'>;

    increment: (
      global: State,
      dispatch: Dispatch,
      i: number,
    ) => Pick<State, 'count'>;

    doNothing: (
      global: State,
      dispatch: Dispatch,
    ) => null;

    getCartItems: (
      global: State,
      dispatch: Dispatch,
    ) => null; */
    getCart: (global: State, dispatch: Dispatch) => Pick<State, 'cartItems'>
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
  }
}
