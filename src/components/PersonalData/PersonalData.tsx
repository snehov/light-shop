import React, { useEffect, useState } from 'react'
import { useForm, useField } from 'react-final-form-hooks'
// https://github.com/final-form/react-final-form-hooks#validate-valuesobject--object--promiseobject
import Address from './Address'
const inputs = [
  { name: 'firstName' },
  { name: 'tel', label: 'Telefon' },
  { name: 'mail', label: 'mail' },
]
const PersonalData = () => {
  const [formValid, setFormValid] = useState(false)
  let genForm = {}
  const validate = (values: any) => validation(values, setFormValid, genForm)
  const onSubmit = (values: any) => {
    console.log('onSubmit', values)
  }
  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    validate,
  })
  genForm = form
  useEffect(() => {
    console.log('values', values)
  }, [values])
  useEffect(() => {
    form.change('firstName', 'nekdo jiný')
  }, [form])
  const firstName = useField('firstName', form) //, value => oneFvalid(value, { minLength: 2 }))
  const lastName = useField('lastName', form)
  console.log('getRegisteredFields ', form.getRegisteredFields())
  console.log('getFieldState lastName', form.getFieldState('lastName'))
  
  /* inputs.forEach((input)=>{
    console.log("input", input)
    const [[input.name] => useField(input.name, form)
  }) */
  /* const oneFvalid = (value: string, valid: any) => {
    console.log('oneFvalid', value, valid)
    if (valid.minLength && value && value.length < valid.minLength) {
      return 'krátké'
    }
    return undefined
  } */
  const extraEvent=()=>{
    console.log('EEgetRegisteredFields ', form.getRegisteredFields())
    form.registerField('lastName', () => {}, {})
    console.log('EEgetRegisteredFields ', form.getRegisteredFields())
  }

  return (
    <div>
      <button onClick={extraEvent} >make EXTRA!</button>
      <form onSubmit={handleSubmit}>
        <div>
          {formValid && <div>VPO58DKU!!</div>}
          <label>First Name</label>
          <input {...firstName.input} placeholder="First Name" />
          {firstName.meta.touched && firstName.meta.error && (
            <span>{firstName.meta.error}</span>
          )}
        </div>
        <div>
          <label>Last Name</label>
          <input {...lastName.input} placeholder="Last Name" minLength={2} />
          {lastName.meta.touched && lastName.meta.error && (
            <span>{lastName.meta.error}</span>
          )}
        </div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button
          type="button"
          onClick={() => form.reset()}
          disabled={submitting || pristine}
        >
          Reset
        </button>
      </form>
      {/* 
      <h2>osobní udaje</h2>
      <div>
        <h3>Adresa doručení</h3>
        <Address addresType="delivery" />
      </div>
      <div>
        <h3>Fakturační údaje</h3>
        <Address addresType="invoce" />
      </div> */}
    </div>
  )
}
const validation = (values: any, setFormValid: any, genForm: any) => {
  console.log('validate values', values, genForm) //only touched values
  const errors = { firstName: '', lastName: '' }
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (values.lastName && values.lastName.length < 2) {
    errors.lastName = 'too short'
  }
  const allPassed = Object.entries(errors).every(([key, item]) => item === '')
  setFormValid(allPassed)
  console.log('error from validation', errors, 'allOK', allPassed)
  return allPassed ? undefined : errors
}
export default PersonalData
