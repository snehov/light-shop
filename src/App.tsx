import React, { useDispatch, useGlobal, useEffect } from 'reactn'
import { useTranslation } from 'react-i18next'
import './i18n'
import './App.scss'
import './reducers'
import Cart from './Cart'
import DeliveryAndPay from './components/DeliveryAndPay'
import DeliveryInfo from './components/DeliveryInfo'
import UserLogin from './components/UserLogin'
import { getEnv } from 'utils/functions'
const App = () => {
  const fetchCart = useDispatch('getCart')
  const fetchOrderInfo = useDispatch('fetchOrderInfo')
  const [cartItems] = useGlobal('cartItems')
  const [selectedDelivery] = useGlobal('selectedDelivery')
  const [selectedPayment] = useGlobal('selectedPayment')
  const changeLang = useDispatch('changeLang')
  const addRandomItem = useDispatch('addRandomItem')
  const clearAllData = useDispatch('clearAllData')
  const { i18n } = useTranslation()

  useEffect(() => {
    fetchCart()
    fetchOrderInfo()
    //console.log('process.env.NODE_ENV', process.env)
  }, [fetchCart, fetchOrderInfo])

  const dapAllowed = cartItems.length > 0
  const addressAllowed = dapAllowed && selectedDelivery && selectedPayment

  return (
    <div className="App">
      <fieldset>
        <legend>External app buttons</legend>
        <button onClick={() => changeLang('en', i18n)} className="langToEn">
          en
        </button>
        <button onClick={() => changeLang('cz', i18n)} className="langToCz">
          cz
        </button>
        {/* NODE_ENV:{process.env.NODE_ENV},{process.env.REACT_APP_MYENV}, Ue: */}
        {/* getEnv() */}
        <button onClick={() => addRandomItem()}>Add random item</button>
        <button onClick={() => clearAllData()}>Clear cart at BE</button>
      </fieldset>
      <Cart />
      {/* <UserLogin /> */}
      {dapAllowed && <DeliveryAndPay disabled={!dapAllowed} />}
      {dapAllowed && <DeliveryInfo disabled={!addressAllowed} />}
    </div>
  )
}

export default App
