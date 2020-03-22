import { setGlobal, addReducer } from 'reactn'
import { fetchCart, changeCartItemAmount, removeFromCart } from '../api'

setGlobal({ cartItems: [] })
setGlobal({ cartInfo: {} })

addReducer('getCart', async (global, dispatch, i, j) => {
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

const parseIncomingCart = data => {
  // TODO: check incoming data format!!!
  return { cartItems: data.cart, cartInfo: data.sum }
}
