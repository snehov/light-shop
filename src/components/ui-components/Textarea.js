import React from 'react'
import Input from './Inputjs.js'

const Textarea = ({ name, groupName = '', label, width, rows, ...props }) => {
  const id = groupName ? `${groupName}_${name}` : name

  return (
    <div className="inputLine" style={{ maxWidth: width }}>
      <label className="labelToInput" htmlFor={id}>
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        rows={rows}
        {...props}
        style={{ width: '100%' }}
      />
    </div>
  )
}
export default Textarea
