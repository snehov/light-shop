import { setGlobal, addReducer } from 'reactn'
import { createLogin, login } from '../api'
var sha1 = require('sha1')

//setGlobal({ cartItems: {} })

addReducer('createLogin', async (global, dispatch, loginInfo) => {
  const loginObj = {
    name: loginInfo.name,
    email: loginInfo.email,
    pwd: ecryptPwd(loginInfo.pwd),
  }
  let response = await createLogin(loginObj)
  if (typeof response.data === 'object') {
    return {}
  }
  return {}
})

addReducer('login', async (global, dispatch, loginInfo) => {
  let response = await login({ ...loginInfo, pwd: ecryptPwd(loginInfo.pwd) })
  if (typeof response.data === 'object') {
    return { orderInfo: response.data.orderInfo }
  }
  return {}
})

const ecryptPwd = (pwd: string) => {
  console.log('PWD', pwd)
  const salt = 'We5gP'
  return sha1(pwd + salt)
}
