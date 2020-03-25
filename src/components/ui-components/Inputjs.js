import React from 'react'

const Input = ({ type, name, value, onChange, errors, ...props }) => {
  return (
    <span>
      <input
        className={
          errors && [null, ''].includes(errors[name])
            ? 'input'
            : 'input inputError'
        }
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
