import { setGlobal, addReducer } from 'reactn'
import {
  fetchCart,
  changeCartItemAmount,
  removeFromCart,
  fetchDeliveryPayMethods,
  changeDeliveryMethod,
  fetchOrderInfo,
  changePaymentMethod,
} from '../api'
import { CartType, CartItemType } from 'utils/types'

setGlobal({ cartItems: [] })
setGlobal({ cartInfo: {} })
setGlobal({ orderInfo: {} })
setGlobal({ deliveryMethods: {} })
setGlobal({ paymentMethods: {} })
setGlobal({ selectedDelivery: 0 })

addReducer('getCart', async () => {
  let response = await fetchCart() //firstTime=bool
  /* if(firstTime && cartInLocalStorage){
    return loadCartFromLocalStorage()
  } */
  //console.log('>>přisla data pres reducer', response.data)
  return parseIncomingCart(response.data)
})
addReducer(
  'changeCartItemAmount',
  async (global, dispatch, index, newAmount) => {
    let response = await changeCartItemAmount(index, newAmount)
    return parseIncomingCart(response.data)
  },
)
addReducer('removeFromCart', async (global, dispatch, index) => {
  let response = await removeFromCart(index)
  return parseIncomingCart(response.data)
})
addReducer('getDeliveryAndPay', async () => {
  let response = await fetchDeliveryPayMethods()
  return {
    deliveryMethods: response.data.delivery,
    paymentMethods: response.data.payments,
  }
})
addReducer('changeDeliveryMethod', async (global, dispatch, delivery_id) => {
  setGlobal({ selectedDelivery: delivery_id })
  let response = await changeDeliveryMethod(delivery_id)
  return parseIncomingCart(response.data)
})
addReducer('changePaymentMethod', async (global, dispatch, payment_id) => {
  let response = await changePaymentMethod(payment_id)
  return parseIncomingCart(response.data)
})
addReducer('fetchOrderInfo', async () => {
  let response = await fetchOrderInfo()
  setGlobal({ selectedDelivery: response.data.deliveryMethod })
  return {
    orderInfo: response.data,
  }
})

const parseIncomingCart = (data: CartData) => {
  // TODO: check incoming data format!!!
  return { cartItems: data.cart, cartInfo: data.sum }
}

type CartData = {
  cart: CartItemType
  sum: CartType
}
