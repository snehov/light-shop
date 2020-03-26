import React, { useEffect, useState } from 'react'
import { useForm, useField } from 'react-final-form-hooks'
// https://github.com/final-form/react-final-form-hooks#validate-valuesobject--object--promiseobject
import { validateAllFields } from 'utils/formsFnc'
import Address from './Address'
const isNil = require('ramda').isNil
const isEmpty = require('ramda').isEmpty

const inputsConfig = {
  firstName: { required: true, minLength: 2 },
  lastName: { minLength: 2 },
  street: { required: true },
  zip: { minLength: 5, maxLength: 5, type: 'number' },
  email: { type: 'email' },
}
const PersonalData = () => {
  const [formValid, setFormValid] = useState(false)
  let genForm = {}
  const validate = (values: any) =>
    validation(values, setFormValid, genForm, inputsConfig)
  const onSubmit = (values: any) => {
    console.log('onSubmit', values)
  }
  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    validate,
  })
  genForm = form
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
          <Inp field={firstName} label="Jméno" config={inputsConfig} />
          <Inp field={lastName} label="Příjmení" config={inputsConfig} />
          <Inp field={street} label="Ulice" config={inputsConfig} />
          <Inp field={zip} label="PSČ" config={inputsConfig} />
          <Inp field={email} label="emil" config={inputsConfig} />
        </div>
        <button type="submit" disabled={pristine || submitting || !formValid}>
          Submit
        </button>
      </form>
    </div>
  )
}
const Inp = ({
  field,
  label,
  config,
}: {
  field: any
  label: string
  config: any
}) => {
  const name = field.input.name
  console.log('NAME CONFIG', config, name)
  const type = config[name].type || 'text'
  const required = config[name].required || false
  return (
    <div>
      <label>{label}</label>
      {console.log('ZIP.input', field.input)}
      <input
        {...field.input}
        placeholder={label}
        type={type}
        className={field.meta.error ? 'inputError input' : 'input'}
      />
      {required && '*'}
      {field.meta.touched && field.meta.error && (
        <span>{field.meta.error}</span>
      )}
    </div>
  )
}
const validation = (
  values: any,
  setFormValid: any,
  form: any,
  inputsConfig: object,
) => {
  if (isEmpty(form)) {
    return undefined
  }
  console.log(
    'validate values',
    values,
    /* form, */
    form.getRegisteredFields(),
    inputsConfig,
  ) //only touched values
  const { errors, passed } = validateAllFields(inputsConfig, values)
  setFormValid(passed)
  console.log('error from validation', errors, 'allOK', passed)
  return passed ? undefined : errors
}
export default PersonalData
