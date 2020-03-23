import { setGlobal, addReducer } from 'reactn'
import {
  fetchCart,
  changeCartItemAmount,
  removeFromCart,
  fetchDeliveryPayMethods,
  changeDeliveryMethod,
} from '../api'
import { CartType, CartItemType } from 'utils/types'

setGlobal({ cartItems: [] })
setGlobal({ cartInfo: {} })
setGlobal({ deliveryMethods: {} })
setGlobal({ paymentMethods: {} })

addReducer('getCart', async () => {
  let response = await fetchCart()
  //console.log('>>přisla data pres reducer', response.data)
  return parseIncomingCart(response.data)
})
addReducer(
  'changeCartItemAmount',
  async (global, dispatch, index, newAmount) => {
    let response = await changeCartItemAmount(index, newAmount)
    //console.log('přisla data pres reducer', response.data)
    return parseIncomingCart(response.data)
  },
)
addReducer('removeFromCart', async (global, dispatch, index) => {
  let response = await removeFromCart(index)
  //console.log('přisla data pres reducer', response.data)
  return parseIncomingCart(response.data)
})
addReducer('getDeliveryAndPay', async () => {
  let response = await fetchDeliveryPayMethods()
  //console.log('>>přisla data pres reducer', response.data)
  return {
    deliveryMethods: response.data.delivery,
    paymentMethods: response.data.payments,
  }
})
addReducer(
  'changeDeliveryMethod',
  async (global, dispatch, delivery_id) => {
    let response = await changeDeliveryMethod(delivery_id)
    //console.log('přisla data pres reducer', response.data)
    return parseIncomingCart(response.data)
  },
)

const parseIncomingCart = (data: CartData) => {
  // TODO: check incoming data format!!!
  return { cartItems: data.cart, cartInfo: data.sum }
}

type CartData = {
  cart: CartItemType
  sum: CartType
}
