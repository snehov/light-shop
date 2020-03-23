import { setGlobal, addReducer } from 'reactn'
import { fetchCart, changeCartItemAmount, removeFromCart } from '../api'
import { CartType, CartItemType } from 'utils/types'

setGlobal({ cartItems: [] })
setGlobal({ cartInfo: {} })

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

const parseIncomingCart = (data: CartData) => {
  // TODO: check incoming data format!!!
  return { cartItems: data.cart, cartInfo: data.sum }
}

type CartData = {
  cart: CartItemType
  sum: CartType
}
