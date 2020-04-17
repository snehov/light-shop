import React, { useDispatch, useState, useEffect, useGlobal } from 'reactn'
import { useTranslation } from 'react-i18next'
import CreateLogin from './forms/CreateLogin'
import Login from './forms/Login'

const UserLogin = () => {
  const [userAccOpt, setUserAccOpt] = useState('oneTimeShopOpt')
  const [regUser] = useGlobal('regUser')
  const logout = useDispatch('logout')
  const { t } = useTranslation()

  const changeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = String(e.target.value)
    console.log('selectedValue', selectedValue)
    setUserAccOpt(selectedValue)
  }

  return (
    <div className="loginOptsCont">
      <h2>{t('login.accountChoice')}</h2>
      {regUser?.logged === true ? (
        <div className="cy-loggedUser">
          {t('login.loggedAsUser')}: {regUser.name}{' '}
          <button onClick={logout}>{t('login.logout')}</button>
        </div>
      ) : (
        <>
          <div className="loginOpts">
            <label htmlFor="oneTimeShopOpt" className="inputCont">
              {t('login.noAccount')}
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
              {t('login.createAccount')}
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
              {t('login.login')}
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
        </>
      )}
    </div>
  )
}

export default UserLogin
