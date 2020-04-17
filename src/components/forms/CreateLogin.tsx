import React, { useEffect, useState, useDispatch } from 'reactn'
import { useTranslation } from 'react-i18next'
import { useForm, useField } from 'react-final-form-hooks'
import { InputFF } from 'components/ui-components'
import addi18toInputs from 'i18n/addi18toInputs'
import { finalFormValidation } from 'utils/formsFnc'

const inputsConf = {
  name: { required: true, minLength: 4, label: 'Jméno a přijmení' },
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
    label: 'Heslo',
    placeholder: 'Alespoň 6 znaků',
    equalsTo: 'pwd2',
    equalsToErr: 'hesla se nesmí lišit',
  },
  pwd2: {
    required: true,
    type: 'password',
    minLength: 6,
    label: 'Heslo',
    placeholder: 'Alespoň 6 znaků',
    equalsTo: 'pwd',
    equalsToErr: 'hesla se nesmí lišit',
  },
}

const CreateLogin = () => {
  const [formValid, setFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
    console.log('submiting,', values)
    setIsSubmitting(true)
    createLogin(values)
    setTimeout(() => setIsSubmitting(false), 3000)
  }
  const name = useField('name', form)
  const email = useField('email', form)
  const pwd = useField('pwd', form)
  const pwd2 = useField('pwd2', form)
  return (
    <div>
      <h3>Založení uživatele</h3>
      <InputFF field={name} config={inputsConfig} g={dataName} />
      <InputFF field={email} config={inputsConfig} g={dataName} />
      <InputFF field={pwd} config={inputsConfig} g={dataName} />
      <InputFF field={pwd2} config={inputsConfig} g={dataName} />
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
export default CreateLogin
