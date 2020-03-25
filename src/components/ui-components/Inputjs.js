import React from 'react'

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
  return (
    <span>
      <input
        className={errors && errors[name] != null ? 'inputError' : ''}
        type={type}
        name={name}
        value={value === null ? '' : value}
        onChange={onChange}
        {...props}
      />
      {errors && errors[name] != null && errors[name]}
    </span>
  )
}
export default Input
