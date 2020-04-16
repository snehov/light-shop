import React, { useEffect, useState, useDispatch } from 'reactn'
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
    placeholder: 'Váš registrovaný email @',
  },
  pwd: {
    required: true,
    type: 'password',
    label: 'Heslo',
  },
}

const Login = () => {
  const [formValid, setFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const createLogin = useDispatch('login')

  const { t } = useTranslation()
  const inputsConfig = addi18toInputs(inputsConf, t)
  let formSource = {}
  const { form, values, handleSubmit } = useForm({
    onSubmit: (values: any) => {},
    validate: (values: any) =>
      finalFormValidation(values, setFormValid, formSource, inputsConfig),
  })
  formSource = form

  useEffect(() => {
    console.log('values', values, 'formValid', formValid)
  }, [formValid, values]) // eslint-disable-line

  const submitData = () => {
    console.log('submiting,', values)
    setIsSubmitting(true)
    createLogin(values)
    setTimeout(() => setIsSubmitting(false), 3000)
  }
  const email = useField('email', form)
  const pwd = useField('pwd', form)

  return (
    <div>
      <h3>Přihlášení uživatele</h3>
      <InputFF field={email} config={inputsConfig} />
      <InputFF field={pwd} config={inputsConfig} />
      {isSubmitting ? (
        <button className="formSubmit formSubmit--submitting" disabled>
          {t('isSending')}
        </button>
      ) : formValid ? (
        <button className="formSubmit formSubmit--ready" onClick={submitData}>
          {t('order')}
        </button>
      ) : (
        <button
          className="formSubmit  formSubmit--notReady"
          onClick={() => handleSubmit()}
        >
          {t('order')}
        </button>
      )}
    </div>
  )
}
export default Login
