import React, { useEffect, useState } from 'react'
import { useForm, useField } from 'react-final-form-hooks'
import { finalFormValidation } from 'utils/formsFnc'
import Address from './Address'

const inputsConfig = {
  firstName: { required: true, minLength: 2 },
  lastName: { minLength: 2 },
  street: { required: true },
  zip: { minLength: 5, maxLength: 5, type: 'number' },
  email: { type: 'email' },
}
const PersonalData = () => {
  const [formValid, setFormValid] = useState(false)
  let formSource = {}
  const validate = (values: any) =>
    finalFormValidation(values, setFormValid, formSource, inputsConfig)
  const onSubmit = (values: any) => {
    console.log('onSubmit', values)
  }
  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    validate,
  })
  formSource = form
  useEffect(() => {
    //console.log('values', values)
  }, [values])
  useEffect(() => {
    //form.change('firstName', 'nekdo jiný')
  }, [form])
  const firstName = useField('firstName', form)
  const lastName = useField('lastName', form)
  const street = useField('street', form)
  const zip = useField('zip', form)
  const email = useField('email', form)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <InputFF field={firstName} label="Jméno" config={inputsConfig} />
          <InputFF field={lastName} label="Příjmení" config={inputsConfig} />
          <InputFF field={street} label="Ulice" config={inputsConfig} />
          <InputFF field={zip} label="PSČ" config={inputsConfig} />
          <InputFF field={email} label="emil" config={inputsConfig} />
        </div>
        <button type="submit" disabled={pristine || submitting || !formValid}>
          Submit
        </button>
      </form>
    </div>
  )
}
const InputFF = ({
  field,
  label,
  config,
}: {
  field: any
  label: string
  config: any
}) => {
  const name = field.input.name
  const type = config[name].type || 'text'
  const required = config[name].required || false
  const showError = field.meta.touched && field.meta.error
  return (
    <div>
      <label className="labelToInput">{label}</label>
      <input
        {...field.input}
        placeholder={label}
        type={type}
        className={showError ? 'inputError input' : 'input'}
      />
      {required && '*'}
      {showError && <span>{field.meta.error}</span>}
    </div>
  )
}

export default PersonalData
