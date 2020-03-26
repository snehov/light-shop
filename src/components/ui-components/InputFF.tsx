import React, { useEffect, useState } from 'react'

const InputFF = ({
  field,
  label,
  config,
}: {
  field: any
  label: string
  config: any
}) => {
  const name = field.input.name
  const [useId, setUseId] = useState(name)
  const type = config[name].type || 'text'
  const required = config[name].required || false
  const showError = field.meta.touched && field.meta.error
  useEffect(() => {
    // check for duplicate html tag ID
    // maybe GET RID OF THIS CHECK
    const elements = [...(document.querySelectorAll('[id]') as any)]
    const ids = elements.map(el => el.id)
    const dups = elements.filter(
      el => ids.filter(id => id === el.id).length > 1,
    )
    if (dups.length > 0) {
      setUseId(`${name}_${Math.floor(Math.random() * 100)}`)
    }
  }, []) // eslint-disable-line
  return (
    <div>
      <label className="labelToInput" htmlFor={useId}>
        {label}
      </label>
      <input
        {...field.input}
        placeholder={label}
        type={type}
        className={showError ? 'inputError input' : 'input'}
        id={useId}
      />
      {required && '*'}
      {showError && <span>{field.meta.error}</span>}
    </div>
  )
}
export default InputFF
