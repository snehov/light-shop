export const getProperInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  const target = e.target
  let safeValue
  if (target.type === 'number') {
    safeValue = Number(target.value)
  } else {
    safeValue = target.value
  }
  return safeValue
}

export const fieldValidation = (
  formSettings: object,
  name: string,
  value: any,
) => {
  let err = ''
  let tmpVal = value.toString()
  const nameKey = (formSettings as any)[name]
  const required = nameKey.required
  console.log('fieldValidation', formSettings, name, tmpVal)

  if (required || tmpVal.length > 0) {
    if (nameKey.minLength && tmpVal.length < nameKey.minLength) {
      err = 'moc krátké'
    }
    if (nameKey.maxLength && tmpVal.length > nameKey.maxLength) {
      err = 'moc dlouhé'
    }
    if (nameKey.type === 'email') {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(String(tmpVal).toLowerCase())) {
        err = 'neplatny email'
      }
    }
  }

  if (required && ['', null].includes(value)) {
    err = 'vyžadováno'
  }

  return err
}

export const validateAllFields = (formSettings: object, fieldsVal: object) => {
  let passed = true
  let errors = {}
  Object.entries(formSettings).forEach(([name, item]) => {
    const currentValue = (fieldsVal as any)[name] || ''

    const err = fieldValidation(formSettings, name, currentValue)
    if (err !== '') {
      passed = false
      errors = { ...errors, [name]: err }
    }
  })
  return { passed, errors }
}
