import React, { useDispatch, useGlobal, useEffect } from 'reactn'
import { useTranslation } from 'react-i18next'
import './i18n'
import './App.scss'
import './reducers'
import Cart from './Cart'
import DeliveryAndPay from './components/DeliveryAndPay'
import InputForms from './components/InputForms'
import UserLogin from './components/UserLogin'
import OrderCompletedScreen from './components/OrderCompletedScreen'
import { getEnv } from 'utils/functions'
const App = () => {
  const fetchCart = useDispatch('getCart')
  const fetchOrderInfo = useDispatch('fetchOrderInfo')
  const [cartItems] = useGlobal('cartItems')
  const [selectedDelivery] = useGlobal('selectedDelivery')
  const [selectedPayment] = useGlobal('selectedPayment')
  const [showOrderCompletedScreen] = useGlobal('showOrderCompletedScreen')
  //const [testVar] = useGlobal('testVar')
  const changeLang = useDispatch('changeLang')
  const addRandomItem = useDispatch('addRandomItem')
  const addPhysicalItem = useDispatch('addPhysicalItem')
  const addOnlineItem = useDispatch('addOnlineItem')
  const clearCartData = useDispatch('clearCartData')
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
      {['development', 'test'].includes(getEnv()) && (
        <fieldset>
          <legend>External app buttons</legend>
          <button onClick={() => changeLang('en', i18n)} className="langToEn">
            en
          </button>
          <button onClick={() => changeLang('cz', i18n)} className="langToCz">
            cz
          </button>

          <button onClick={() => addRandomItem()}>Add random item</button>
          <button onClick={() => addPhysicalItem()}>Add physical item</button>
          <button onClick={() => addOnlineItem()}>Add online item</button>
          <button onClick={() => clearCartData()}>Clear cart at BE</button>
          <button onClick={() => clearAllData()}>Reset All</button>
        </fieldset>
      )}
       {showOrderCompletedScreen ? (
        <OrderCompletedScreen />
      ) : (
        <>
          <Cart />
          <UserLogin />
          {dapAllowed && <DeliveryAndPay disabled={!dapAllowed} />}
          {dapAllowed && <InputForms disabled={!addressAllowed} />}
          {/* <div>ls:{localStorage.getItem('cartSimple')}</div>
          <div>GS:{JSON.stringify(cartItems)}</div>
          <div>test:{JSON.stringify(testVar)}</div> 
          */}
        </>
      )}
    </div>
  )
}

export default App
