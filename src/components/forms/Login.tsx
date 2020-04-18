import React, { useEffect, useState, useDispatch, useGlobal } from 'reactn'
import { useTranslation } from 'react-i18next'
import { useForm, useField } from 'react-final-form-hooks'
import { InputFF } from 'components/ui-components'
import addi18toInputs from 'i18n/addi18toInputs'
import { finalFormValidation } from 'utils/formsFnc'

const inputsConf = {
  email: {
    required: true,
    type: 'email',
    label: 'personal.email',
    placeholder: 'login.userRegEmail',
  },
  pwd: {
    required: true,
    type: 'password',
    label: 'login.password',
  },
}

const Login = () => {
  const [formValid, setFormValid] = useState(false)
  const [isLoggingIn] = useGlobal('isLoggingIn')
  const [regUser] = useGlobal('regUser')
  const sendLogin = useDispatch('login')
  const dataName = 'login'
  const { t } = useTranslation()
  const inputsConfig = addi18toInputs(inputsConf, t)
  let formSource = {}
  const { form, values, handleSubmit } = useForm({
    onSubmit: (values: any) => {},
    validate: (values: any) =>
      finalFormValidation(values, setFormValid, formSource, inputsConfig),
  })
  formSource = form

  /* useEffect(() => {
    console.log('values', values, 'formValid', formValid)
  }, [formValid, values]) // eslint-disable-line */

  const submitData = () => {
    sendLogin(values)
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitData()
    }
  }
  const email = useField('email', form)
  const pwd = useField('pwd', form)

  return (
    <div>
      <h3>{t('login.userLogin')}</h3>
      <InputFF field={email} config={inputsConfig} g={dataName} />
      <InputFF
        field={pwd}
        config={inputsConfig}
        g={dataName}
        onKeyPress={handleKeyPress}
      />
      {isLoggingIn ? (
        <button className="formSubmit formSubmit--submitting" disabled>
          {t('isSending')}
        </button>
      ) : formValid ? (
        <button
          className="formSubmit formSubmit--ready submitLogin"
          onClick={submitData}
        >
          {t('send')}
        </button>
      ) : (
        <button
          className="formSubmit  formSubmit--notReady"
          onClick={() => handleSubmit()}
        >
          {t('send')}
        </button>
      )}
      {regUser?.logged === 'failed' ? <div>{t('login.loginFailed')}</div> : ''}
    </div>
  )
}
export default Login
