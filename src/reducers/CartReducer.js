import { setGlobal, addReducer } from 'reactn'
import { fetchCartItems, changeCartItemAmount, removeFromCart } from '../api'

setGlobal({ cartItems: [] })

addReducer('getCartItems', async (global, dispatch, i, j) => {
  let response = await fetchCartItems()
  //console.log('přisla data pres reducer', response.data)
  return { cartItems: response.data }
})

addReducer('changeCartItemAmount', async (global, dispatch, index, newAmount) => {
 //console.log("index, newAmount", index, newAmount)
  let response = await changeCartItemAmount(index, newAmount)
  //console.log('přisla data pres reducer', response.data)
  return { cartItems: response.data }
})

addReducer('removeFromCart', async (global, dispatch, index) => {
  let response = await removeFromCart(index)
  //console.log('přisla data pres reducer', response.data)
  return { cartItems: response.data }
})
