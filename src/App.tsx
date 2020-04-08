import React, { useDispatch, useGlobal, useEffect } from 'reactn'
import './App.scss'
import './reducers'
import Cart from './Cart'
import DeliveryAndPay from './components/DeliveryAndPay'
import DeliveryInfo from './components/DeliveryInfo'
import { getEnv } from 'utils/functions'

const App = () => {
  const fetchCart = useDispatch('getCart')
  const fetchOrderInfo = useDispatch('fetchOrderInfo')
  const [cartItems] = useGlobal('cartItems')
  const [selectedDelivery] = useGlobal('selectedDelivery')
  const [selectedPayment] = useGlobal('selectedPayment')

  useEffect(() => {
    fetchCart()
    fetchOrderInfo()
    console.log('process.env.NODE_ENV', process.env)
  }, [fetchCart, fetchOrderInfo])

  const dapAllowed = cartItems.length > 0
  const addressAllowed = dapAllowed && selectedDelivery && selectedPayment
  console.log(
    'selectedDelivery',
    selectedDelivery,
    'selectedPayment',
    selectedPayment,
  )
  return (
    <div className="App">
      NODE_ENV:{process.env.NODE_ENV},{process.env.REACT_APP_MYENV}, Ue:
      {getEnv()}
      <Cart />
      {dapAllowed && <DeliveryAndPay disabled={!dapAllowed} />}
      {dapAllowed && <DeliveryInfo disabled={!addressAllowed} />}
    </div>
  )
}

export default App
