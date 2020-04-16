import React, { useDispatch, useState, useEffect, useGlobal } from 'reactn'
import { useTranslation } from 'react-i18next'
import CreateLogin from './forms/CreateLogin'
import Login from './forms/Login'

const UserLogin = () => {
  const [userAccOpt, setUserAccOpt] = useState('oneTimeShopOpt')
  const { t } = useTranslation()

  const changeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = String(e.target.value)
    console.log('selectedValue', selectedValue)
    setUserAccOpt(selectedValue)
  }
  return (
    <div className="loginOptsCont">
      <h2>Volba účtu</h2>
      <div className="loginOpts">
        <label htmlFor="oneTimeShopOpt" className="inputCont">
          Jednorázový nákup, bez registrace
          <input
            type="radio"
            name="userAccOpt"
            id="oneTimeShopOpt"
            onChange={changeMethod}
            value="oneTimeShopOpt"
            checked={userAccOpt === 'oneTimeShopOpt' ? true : false} // eslint-disable-line eqeqeq
          />
          <span className="radiobtn"></span>
        </label>
        <label htmlFor="createAccountOpt" className="inputCont">
          Založit uživatelský účet
          <input
            type="radio"
            name="userAccOpt"
            id="createAccountOpt"
            onChange={changeMethod}
            value="createAccountOpt"
            checked={userAccOpt === 'createAccountOpt' ? true : false} // eslint-disable-line eqeqeq
          />
          <span className="radiobtn"></span>
        </label>
        <label htmlFor="loginOpt" className="inputCont">
          Přihlásit se
          <input
            type="radio"
            name="userAccOpt"
            id="loginOpt"
            onChange={changeMethod}
            value="loginOpt"
            checked={userAccOpt === 'loginOpt' ? true : false} // eslint-disable-line eqeqeq
          />
          <span className="radiobtn"></span>
        </label>
      </div>
      {userAccOpt === 'createAccountOpt' && <CreateLogin />}
      {userAccOpt === 'loginOpt' && <Login />}
    </div>
  )
}

export default UserLogin
