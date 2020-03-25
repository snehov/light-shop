import React, { useState } from 'react'

const Input = ({
  type,
  name,
  value,
  onChange,
  minLength,
  maxLength,
  validate,
  errors,
  ...props
}) => {
  //const [errors, setErrors] = useState([])
  /* const validate = () => {
    validation({ target: { value } })
  } */
  /* const validation = e => {
    let err = []
    let tmpVal = e.target.value ? e.target.value.toString() : ''
    if (minLength && tmpVal.length < minLength) {
      err.push('moc krátké')
    }
    if (maxLength && tmpVal.length > maxLength) {
      err.push('moc dlouhé')
    }
    setErrors(err)
    return err.length > 0 ? false : true
  } */
  /* const localChange = e => {
    onChange(e)
    if (errors.length > 0) {
      //validation(e)
    }
  }
  const blur = e => {
    //validation(e)
  } */
  console.log("errors in inputs", errors)
  return (
    <span>
      <input
        className={errors && errors[name]!=null ? 'inputError' : ''}
        type={type}
        name={name}
        value={value === null ? '' : value}
        onChange={onChange}
        {...props}
       /*  onBlur={blur} */
      />
      {errors && errors[name]!=null && errors[name]}
    </span>
  )
}
export default Input
