import React, { useDispatch, useGlobal, useEffect } from 'reactn'
import './App.scss'
import './reducers'
import Cart from './Cart'
import DeliveryAndPay from './components/DeliveryAndPay'
import DeliveryInfo from './components/DeliveryInfo'

const App = () => {
  const fetchCart = useDispatch('getCart')
  const fetchOrderInfo = useDispatch('fetchOrderInfo')
  const [cartItems] = useGlobal('cartItems')
  const [selectedDelivery] = useGlobal('selectedDelivery')
  const [selectedPayment] = useGlobal('selectedPayment')

  useEffect(() => {
    fetchCart()
    fetchOrderInfo()
    console.log("process.env.NODE_ENV", process.env)
  }, [fetchCart, fetchOrderInfo])

  const dapAllowed = cartItems.length > 0
  const addressAllowed =
    dapAllowed && selectedDelivery !== 0 && selectedPayment !== 0

  return (
    <div className="App">
      NODE_ENV:{process.env.NODE_ENV},{process.env.REACT_APP_MYENV}
      <Cart />
      {dapAllowed && <DeliveryAndPay disabled={!dapAllowed} />}
      {dapAllowed && <DeliveryInfo disabled={!addressAllowed} />}
    </div>
  )
}

export default App
