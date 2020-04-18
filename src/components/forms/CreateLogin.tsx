import React, { useEffect, useState, useDispatch, useGlobal } from 'reactn'
import { useTranslation } from 'react-i18next'
import { useForm, useField } from 'react-final-form-hooks'
import { InputFF } from 'components/ui-components'
import addi18toInputs from 'i18n/addi18toInputs'
import { finalFormValidation } from 'utils/formsFnc'

const inputsConf = {
  name: { required: true, minLength: 4, label: 'personal.nameSurname' },
  email: {
    required: true,
    type: 'email',
    label: 'personal.email',
    placeholder: 'personal.email_ph',
  },
  pwd: {
    required: true,
    type: 'password',
    minLength: 6,
    label: 'login.password',
    placeholder: 'login.pwdReqirement',
    equalsTo: 'pwd2',
    equalsToErr: 'login.pwdNotEqual',
  },
  pwd2: {
    required: true,
    type: 'password',
    minLength: 6,
    label: 'login.password',
    placeholder: 'login.pwdReqirement',
    equalsTo: 'pwd',
    equalsToErr: 'login.pwdNotEqual',
  },
}

const CreateLogin = () => {
  const [formValid, setFormValid] = useState(false)
  const [isSubmitting] = useGlobal('isLoggingIn')
  const [regUser] = useGlobal('regUser')
  const createLogin = useDispatch('createLogin')
  const dataName = 'register'

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
    createLogin(values)
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitData()
    }
  }
  const name = useField('name', form)
  const email = useField('email', form)
  const pwd = useField('pwd', form)
  const pwd2 = useField('pwd2', form)
  return (
    <div>
      <h3>{t('login.createAcountHeader')}</h3>
      <InputFF field={name} config={inputsConfig} g={dataName} />
      <InputFF
        field={email}
        config={inputsConfig}
        g={dataName}
        onKeyPress={handleKeyPress}
      />
      <InputFF
        field={pwd}
        config={inputsConfig}
        g={dataName}
        onKeyPress={handleKeyPress}
      />
      <InputFF
        field={pwd2}
        config={inputsConfig}
        g={dataName}
        onKeyPress={handleKeyPress}
      />
      {regUser?.res === 'error' ? (
        <div className="formError cy-createUserErr">
          {t(`login.err_${regUser.err_code}`)}
        </div>
      ) : (
        ''
      )}
      {isSubmitting ? (
        <button className="formSubmit formSubmit--submitting" disabled>
          {t('isSending')}
        </button>
      ) : formValid ? (
        <button
          className="formSubmit formSubmit--ready cy-submitCreateUser"
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
    </div>
  )
}
export default CreateLogin
