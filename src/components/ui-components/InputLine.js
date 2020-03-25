import React from 'react'
import Input from './Inputjs.js'

const InputLine = ({ name, groupName = '', type, label, ...props }) => {
  const id = groupName ? `${groupName}_${name}` : name

  return (
    <div className="inputLine">
      <label htmlFor={id}>{label}</label>
      <Input name={name} type={type} id={id} {...props} />
    </div>
  )
}
export default InputLine
