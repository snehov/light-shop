import React, { useState } from 'react'
//import { useForm } from 'react-hook-form'
import { InputLine } from 'components/ui-components'

const Address = ({ addresType }: { addresType: string }) => {
  const [fieldsVal, changeFieldsVal] = useState({
    name: null,
    surname: null,
    street: null,
    city: null,
    zip: null,
    detail: null,
  })
  /* const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = (data: any) => {
    console.log(data, errors)
  } */

  const changeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    let saveValue
    if (target.type === 'number') {
      saveValue = Number(target.value)
    } else {
      saveValue = target.value
    }
    const newFields = { ...fieldsVal, [target.name]: saveValue }
    //console.log('newFields', newFields)
    changeFieldsVal(newFields)
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
        value={fieldsVal.name}
        onChange={changeVal}
        minLength={2}
      />
      <input type="submit" />

      <InputLine
        name="surname"
        label="Příjmení"
        type="text"
        groupName={addresType}
        value={fieldsVal.surname}
        onChange={changeVal}
      />
      <InputLine
        name="detail"
        label="Upřesnění místa"
        placeholder="firma/patro/recepce..."
        type="text"
        groupName={addresType}
        value={fieldsVal.detail}
        onChange={changeVal}
        minLength={2}
      />
      <InputLine
        name="street"
        label="Ulice"
        type="text"
        groupName={addresType}
        value={fieldsVal.street}
        onChange={changeVal}
        minLength={2}
      />
      <InputLine
        name="city"
        label="Město"
        type="text"
        groupName={addresType}
        value={fieldsVal.city}
        onChange={changeVal}
        minLength={2}
      />
      <InputLine
        name="zip"
        label="PSČ"
        type="number"
        groupName={addresType}
        value={fieldsVal.zip}
        onChange={changeVal}
        minLength={5}
        maxLength={5}
      />
    </div>
  )
}

export default Address
