import { setGlobal, addReducer } from 'reactn'
import { fetchCartItems } from '../api'

setGlobal({ cartItems: [] })

addReducer('getCartItems', async (global, dispatch, i, j) => {
  let response = await fetchCartItems()
  console.log("přisla data pres reducer", response.data)
  return { cartItems: response.data }
})
