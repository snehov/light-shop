import { setGlobal, addReducer } from 'reactn'
import {
  fetchCart,
  changeCartItemAmount,
  removeFromCart,
  fetchDeliveryPayMethods,
  changeDeliveryMethod,
  fetchOrderInfo,
  changePaymentMethod,
  saveAddressInfo,
  submitOrder,
  changeLang,
} from '../api'
import { CartType, CartItemType } from 'utils/types'
import { parseSimpleCartList } from 'utils/functions'
const isEmpty = require('ramda').isEmpty

setGlobal({ cartItems: [] })
setGlobal({ cartInfo: {} })
setGlobal({ orderInfo: {} })
setGlobal({ deliveryMethods: {} })
setGlobal({ paymentMethods: {} })
setGlobal({ selectedDelivery: 0 })
setGlobal({ selectedPayment: 0 })
setGlobal({ isSubmittingOrder: false })

addReducer('getCart', async (global, dispatch) => {
  const cartSimple =
    JSON.stringify(window.localStorage.getItem('cartSimple')) || ''

  const data: any = await dataFromHtmlOrApi_firstTimeOnly(
    global.cartItems,
    'cartItems',
    () => fetchCart(cartSimple),
  )
  return parseIncomingCart(data)
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
addReducer('getDeliveryAndPay', async (global, dispatch) => {
  const data: DeliveryAndPaymentsType = await dataFromHtmlOrApi(
    'delivPayOpts',
    () => fetchDeliveryPayMethods(),
  )
  if (typeof data === 'object') {
    return {
      deliveryMethods: data.delivery,
      paymentMethods: data.payments,
    }
  }
  console.error('invalid incoming data format at getDeliveryAndPay')
  return {}
})
addReducer('changeDeliveryMethod', async (global, dispatch, delivery_id) => {
  setGlobal({ selectedDelivery: delivery_id })
  let response = await changeDeliveryMethod(delivery_id)
  return parseIncomingCart(response.data)
})
addReducer('changePaymentMethod', async (global, dispatch, payment_id) => {
  setGlobal({ selectedPayment: payment_id })
  let response = await changePaymentMethod(payment_id)
  return parseIncomingCart(response.data)
})
addReducer('fetchOrderInfo', async (global) => {
  const data: any = await dataFromHtmlOrApi_firstTimeOnly(
    global.orderInfo,
    'orderInfo',
    () => fetchOrderInfo(),
  )
  return {
    orderInfo: data,
    selectedDelivery: data.deliveryMethod,
    //selectedPayment: data.paymentMethod, //somehow works commented as well
  }
})
addReducer('saveAddressInfo', async (global, dispatch, forms_data) => {
  let response = await saveAddressInfo(forms_data)
  return response.data
})
addReducer('submitOrder', async (global, dispatch, forms_data) => {
  setGlobal({ isSubmittingOrder: true })
  let response = await submitOrder(forms_data)
  setGlobal({ isSubmittingOrder: false })
  alert('A tady bude pokračování na stránku oznamující úspěch')
  console.log('response.data', typeof response.data, response.data, response)
  if (typeof response.data === 'object') {
    return response.data // TODO: maybe also validate returned structure // TODO: use this IF at all API calls
  }
  return {}
})
addReducer('changeLang', async (global, dispatch, lang, i18n) => {
  i18n.changeLanguage(lang)
  let response = await changeLang({ lang })
  if (typeof response.data === 'object') {
    return {
      cartItems: response.data.cartData,
      deliveryMethods: response.data.delivery,
      paymentMethods: response.data.payments,
    }
  }
  return {}
})

const parseIncomingCart = (data: CartData) => {
  window.localStorage.setItem(
    'cartSimple',
    JSON.stringify(parseSimpleCartList(data.cart)),
  )
  // TODO: check incoming data format!!!
  return { cartItems: data.cart, cartInfo: data.sum }
}

// posibility of loading static BE data primary from
//  1) HTML DOCUMENT where values rendered by server there,
// if not found then fallback to
//  2) use API call
const dataFromHtmlOrApi = async (domVar: string, apiCall: any) => {
  let data
  if ((window as any)['APP_DATA'] && (window as any)['APP_DATA'][domVar]) {
    data = JSON.parse((window as any)['APP_DATA'][domVar])
    console.log('data z html', domVar, data)
  }
  if (!data) {
    let response = await apiCall()
    data = response.data
    console.log('data z API', domVar, data)
  }
  return data
}
// operate previous fnc (dataFromHtmlOrApi), but first call time only, oherwise API call
const dataFromHtmlOrApi_firstTimeOnly = async (
  globVar: any,
  domVar: string,
  apiCall: any,
) => {
  let data: any
  if (isEmpty(globVar)) {
    console.log('first time', domVar)
    // on first app init try to reach in html server rendered cartItems Data
    data = await dataFromHtmlOrApi(domVar, apiCall)
  } else {
    // on every other time, ask ONLY to server to actual data
    console.log('any other time DIRECT API', domVar)
    const response = await apiCall()
    data = response.data
  }
  console.log('gv', domVar, globVar, data)
  return data
}

type CartData = {
  cart: CartItemType
  sum: CartType
}
type DeliveryAndPaymentsType = {
  delivery: object
  payments: object
}
