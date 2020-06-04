import { setGlobal, addReducer } from 'reactn'
import { createLogin, login, logout } from '../api'
var sha1 = require('sha1')

setGlobal({ regUser: {} })
setGlobal({ isLoggingIn: false })

addReducer('isLoggingIn', () => {
  return { isLoggingIn: true }
})
addReducer('createLogin', async (global, dispatch, loginInfo) => {
  dispatch.isLoggingIn()
  const loginObj = {
    name: loginInfo.name,
    email: loginInfo.email,
    pwd: ecryptPwd(loginInfo.pwd),
  }
  let response = await createLogin(loginObj)
  if (typeof response.data === 'object') {
    return { regUser: response.data, isLoggingIn: false }
  }
  return { isLoggingIn: false }
})
addReducer('logout', async () => {
  let response = await logout()
  if (typeof response.data === 'object') {
    return { regUser: response.data.logRes }
  }
  return {}
})
addReducer('login', async (global, dispatch, loginInfo) => {
  dispatch.isLoggingIn()
  try {
    let response = await login({ ...loginInfo, pwd: ecryptPwd(loginInfo.pwd) })
    if (typeof response.data === 'object' && response.data.res === 'success') {
      return {
        orderInfo: response.data.orderInfo,
        regUser: response.data.logRes,
        isLoggingIn: false,
      }
    }
  } catch (err) {
    return { isLoggingIn: false, regUser: { logged: 'failed' } }
  }
})

const ecryptPwd = (pwd: string) => {
  const salt = 'We5gP'
  return sha1(pwd + salt)
}
