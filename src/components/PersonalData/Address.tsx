import React, { useState, useEffect } from 'react'
//import { useForm } from 'react-hook-form'
import { InputLine } from 'components/ui-components'
import {
  getProperInputValue,
  fieldValidation,
  validateAllFields,
} from 'utils/formsFnc'
const isNil = require('ramda').isNil
const isEmpty = require('ramda').isEmpty

const formSettings = {
  name: {
    value: null,
    type: 'text',
    required: true,
    minLength: 2,
    error: null,
  },
  surname: { value: 'prefilled', required: true },
  street: { value: null, minLength: 3 },
  city: { value: null },
  zip: { value: null, minLength: 5, maxLength: 5 },
  detail: { value: null },
}
console.log('formSEttins', formSettings)
const FFvalues = Object.keys(formSettings).reduce((acc, curr) => {
  return { ...acc, [curr]: (formSettings as any)[curr].value || null }
}, {})
const FFerrors = Object.keys(formSettings).reduce((acc, curr) => {
  return { ...acc, [curr]: null }
}, {})

const Address = ({ addresType }: { addresType: string }) => {
  const [fieldsVal, changeFieldsVal] = useState(FFvalues)
  const [fieldsErr, changeFieldsErr] = useState(FFerrors)
  const [formPassed, setFormPassed] = useState(false)

  const runValidateAll = (close: boolean) => {
    const res = validateAllFields(formSettings, fieldsVal, fieldsErr, close)
    close && changeFieldsErr({ ...fieldsErr, ...res.errors })
    setFormPassed(res.passed)
  }

  const runValidateOne = (name: string, value: any) => {
    let err = ''
    // const safeName = Object.keys(formSettings).filter(k => k === name)[0]
    if (!isNil((formSettings as any)[name])) {
      err = fieldValidation(formSettings, name, value)
    }
    changeFieldsErr({ ...fieldsErr, [name]: err })
  }

  const changeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const safeValue = getProperInputValue(e)
    const newFields = { ...fieldsVal, [name]: safeValue }
    console.log('newFields', newFields)
    changeFieldsVal(newFields)
    //------run validation----
    // wait after first blur, then with every type
    if (![undefined, null].includes((fieldsErr as any)[name])) {
      runValidateOne(name, safeValue)
    }
    // invisible validation of form, here with every change value
    runValidateAll(false)
  }

  const inputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    runValidateOne(e.target.name, getProperInputValue(e))
  }

  return (
    <div>
      <button onClick={() => runValidateAll(true)}>validace end</button>
      <button onClick={() => runValidateAll(false)}>validace prubeh</button>
      {formPassed && <span>form must go on</span>}
      <InputLine
        name="name"
        label="Jméno"
        type="text"
        groupName={addresType}
        value={(fieldsVal as any).name}
        onChange={changeVal}
        onBlur={inputBlur}
        errors={fieldsErr}
      />

      <InputLine
        name="surname"
        label="Příjmení"
        type="text"
        groupName={addresType}
        value={(fieldsVal as any).surname}
        onChange={changeVal}
        onBlur={inputBlur}
        errors={fieldsErr}
      />
      <InputLine
        name="detail"
        label="Upřesnění místa"
        placeholder="firma/patro/recepce..."
        type="text"
        groupName={addresType}
        value={(fieldsVal as any).detail}
        onChange={changeVal}
        onBlur={inputBlur}
        errors={fieldsErr}
      />
      <InputLine
        name="street"
        label="Ulice"
        type="text"
        groupName={addresType}
        value={(fieldsVal as any).street}
        onChange={changeVal}
        onBlur={inputBlur}
        errors={fieldsErr}
      />
      <InputLine
        name="city"
        label="Město"
        type="text"
        groupName={addresType}
        value={(fieldsVal as any).city}
        onChange={changeVal}
        onBlur={inputBlur}
        errors={fieldsErr}
      />
      <InputLine
        name="zip"
        label="PSČ"
        type="number"
        groupName={addresType}
        value={(fieldsVal as any).zip}
        onChange={changeVal}
        onBlur={inputBlur}
        errors={fieldsErr}
      />
    </div>
  )
}

export default Address
