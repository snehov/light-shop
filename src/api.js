import axios from 'axios'
const baseURL = 'https://snowcorp.cz/ls/contentFILES/Cart_api.php?rquest='

const api = axios.create({
  //baseURL,
  //trailingSlash: true,
  withCredentials: true, // allows to sending sessionID
  headers: {
    Accept: 'application/json, application/xml, text/play, text/html,',
    'Content-Type': 'application/json; charset=utf-8',
  },
})

export const fetchCart = () => api.get(baseURL + 'getCart')

export const changeCartItemAmount = (index, amount) =>
  api.post(baseURL + 'changeCartItemAmount', { index, amount })

export const removeFromCart = index =>
  api.post(baseURL + 'removeFromCart', { index })

export const addItem = () =>
  api.post(baseURL + 'addToCart', { product_id: 7, variant: '' })

export const fetchDeliveryPayMethods = () =>
  api.get(baseURL + 'getDeliveryAndPay')

export const changeDeliveryMethod = delivery_id =>
  api.patch(baseURL + 'changeDeliveryMethod', { delivery_id })

export const getTest = () => api.get(baseURL + 'getTest')

//changeDeliveryMethod
