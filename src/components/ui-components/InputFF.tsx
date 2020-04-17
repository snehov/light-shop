import React, { useEffect, useState } from 'react'

const InputFF = ({
  field,
  config,
  g,
  onKeyPress
}: {
  field: any
  config: any
  g?: string
  onKeyPress?: any
}) => {
  const name = field.input.name
  const [useId, setUseId] = useState(name)
  const type = config[name].type || 'text'
  const required = config[name].required || false
  const showError = field.meta.touched && field.meta.error
  useEffect(() => {
    // check for duplicate html tag ID
    // maybe GET RID OF THIS CHECK
    if (g) {
      setUseId(`${name}_${g}`)
    } else {
      const elements = [...(document.querySelectorAll('[id]') as any)]
      const ids = elements.map(el => el.id)
      const dups = elements.filter(
        el => ids.filter(id => id === el.id).length > 1,
      )
      if (dups.length > 0) {
        setUseId(`${name}_${Math.floor(Math.random() * 100)}`)
      }
    }
  }, []) // eslint-disable-line
  return (
    <div className="inputLine">
      <label className="labelToInput" htmlFor={useId}>
        {config[name].label}
        {required && <span title="povinné pole">*</span>}
      </label>
      <input
        {...field.input}
        placeholder={config[name].placeholder}
        type={type}
        className={showError ? 'input--error input' : 'input'}
        id={useId}
        onKeyPress={onKeyPress}
      />
      <div className={showError ? 'validation--error' : 'validation--empty'}>
        {showError && field.meta.error}
      </div>
    </div>
  )
}
export default InputFF
