import axios from 'axios'
import { getEnv } from 'utils/functions'

const api = axios.create({
  baseURL: 'https://snowcorp.cz/ls/cart_api/',
  //trailingSlash: true,
  withCredentials: true, // allows to sending sessionID
  headers: {
    Accept: 'application/json, application/xml, text/play, text/html,',
    'Content-Type': 'application/json; charset=utf-8',
    env: getEnv(),
  },
})

export const fetchCart = (cartSimple = '') => {
  return cartSimple === ''
    ? api.get('getCart')
    : api.post('getCart', cartSimple)
}

export const changeCartItemAmount = (index, amount) =>
  api.post('changeCartItemAmount', { index, amount })

export const removeFromCart = (index) => api.post('removeFromCart', { index })

export const addItem = () =>
  api.post('addToCart', { product_id: 7, variant: '' })

export const fetchDeliveryPayMethods = () => api.get('getDeliveryAndPay')

export const changeDeliveryMethod = (delivery_id) =>
  api.patch('changeDeliveryMethod', { delivery_id })

export const changePaymentMethod = (payment_id) =>
  api.patch('changePaymentMethod', { payment_id })

export const fetchOrderInfo = () => api.get('getOrderInfo')

export const saveAddressInfo = (forms_data) =>
  api.post('saveAddressInfo', forms_data)

export const changeLang = (lang) => api.post('changeLang', lang)

export const submitOrder = (forms_data) => api.post('submitOrder', forms_data)

export const addRandomItem = () => api.get('addRandomItem')

export const clearCartData = () => api.get('clearCart')
export const clearAllData = () => api.get('resetAll')

export const createLogin = (loginInfo) => api.post('createLogin', loginInfo)
export const login = (loginInfo) => api.post('login', loginInfo)
export const logout = () => api.get('logout')
