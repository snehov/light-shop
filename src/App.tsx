import React, { useDispatch, useGlobal, useEffect } from 'reactn'
import './App.scss'
import './reducers'
import Cart from './Cart'
import DeliveryAndPay from './components/DeliveryAndPay'
import DeliveryInfo from "./components/DeliveryInfo"

const App = () => {
  const fetchCart = useDispatch('getCart')
  const fetchOrderInfo = useDispatch('fetchOrderInfo')
  const [cartItems] = useGlobal('cartItems')
  const [selectedDelivery] = useGlobal('selectedDelivery')
  const [selectedPayment] = useGlobal('selectedPayment')

  useEffect(() => {
    fetchCart() //true for first time
    fetchOrderInfo()
  }, [fetchCart, fetchOrderInfo])
  return (
    <div className="App">
      <Cart />
      {cartItems.length > 0 && <DeliveryAndPay />}
      {selectedDelivery !== 0 && selectedPayment !== 0 && <DeliveryInfo />}
    </div>
  )
}

export default App
