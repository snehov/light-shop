import React, { useState } from 'react'
//import { useForm } from 'react-hook-form'
import { InputLine } from 'components/ui-components'
const isNil = require('ramda').isNil
const formSettings = {
  name: {
    value: null,
    type: 'text',
    required: true,
    minLength: 2,
    error: null,
  },
  surname: { value: 'prefilled' },
  street: { value: null , minLength:3},
  city: { value: null },
  zip: { value: null },
  detail: { value: null },
}
console.log('formSEttins', formSettings)
const FFvalues = Object.keys(formSettings).reduce((acc, curr) => {
  return { ...acc, [curr]: (formSettings as any)[curr].value || null }
}, {})
const FFerrors = Object.keys(formSettings).reduce((acc, curr) => {
  return { ...acc, [curr]: null }
}, {})

//console.log('FFvalues', FFvalues)
const Address = ({ addresType }: { addresType: string }) => {
  const [fieldsVal, changeFieldsVal] = useState(FFvalues)
  const [fieldsErr, changeFieldsErr] = useState(FFerrors)
  //const [fieldsState, changeFieldsStat]=useState(formSettings)
  /* const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = (data: any) => {
    console.log(data, errors)
  } */
  console.log('values', fieldsVal)
  console.log('errors', fieldsErr)

  const runValidate = (name: string, value: any) => {
    let err = ''
    let tmpVal = value.toString()
    //    const safeName = Object.keys(formSettings).filter(k => k === name)[0]
    if (
      !isNil((formSettings as any)[name]) &&
      (formSettings as any)[name].minLength &&
      tmpVal.length < (formSettings as any)[name].minLength
    ) {
      err = 'moc krátké'
    }
    changeFieldsErr({ ...fieldsErr, [name]: err })
  }

  const changeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const name = target.name

    let safeValue
    if (target.type === 'number') {
      safeValue = Number(target.value)
    } else {
      safeValue = target.value
    }
    const newFields = { ...fieldsVal, [name]: safeValue }
    console.log('newFields', newFields)
    changeFieldsVal(newFields)
    //------run validation----
    //const
    // wait after first blur, then with every type

    if (
      ![undefined, null].includes((fieldsErr as any)[name])
      //(fieldsErr as any)[name] !== null
    ) {
      runValidate(name, safeValue)
      /* if (maxLength && tmpVal.length > maxLength) {
      err.push('moc dlouhé')
    } */
    }
  }
  const callValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('blurr, called', e.target.name, e.target.value)
    runValidate(e.target.name, e.target.value)
  }
  return (
    <div>
      {/*  <form onSubmit={handleSubmit(onSubmit)}>
        <input name="example" defaultValue="test" ref={register} />
        <input name="exampleRequired" ref={register({ required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
      </form> */}
      <InputLine
        name="name"
        label="Jméno"
        type="text"
        groupName={addresType}
        errors={fieldsErr}
        //@ts-ignore
        value={fieldsVal.name}
        onChange={changeVal}
        minLength={2}
        onBlur={callValidate}
      />

      <InputLine
        name="surname"
        label="Příjmení"
        type="text"
        groupName={addresType}
        //@ts-ignore
        value={fieldsVal.surname}
        onChange={changeVal}
      />
      <InputLine
        name="detail"
        label="Upřesnění místa"
        placeholder="firma/patro/recepce..."
        type="text"
        groupName={addresType}
        //@ts-ignore
        value={fieldsVal.detail}
        onChange={changeVal}
        minLength={2}
      />
      <InputLine
        name="street"
        label="Ulice"
        type="text"
        groupName={addresType}
        //@ts-ignore
        value={fieldsVal.street}
        onChange={changeVal}
        onBlur={callValidate}
        errors={fieldsErr}
        minLength={2}
      />
      <InputLine
        name="city"
        label="Město"
        type="text"
        groupName={addresType}
        //@ts-ignore
        value={fieldsVal.city}
        onChange={changeVal}
        minLength={2}
      />
      <InputLine
        name="zip"
        label="PSČ"
        type="number"
        groupName={addresType}
        //@ts-ignore
        value={fieldsVal.zip}
        onChange={changeVal}
        minLength={5}
        maxLength={5}
      />
    </div>
  )
}

export default Address
