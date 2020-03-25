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
  if (
    (formSettings as any)[name].minLength &&
    tmpVal.length < (formSettings as any)[name].minLength
  ) {
    err = 'moc krátké'
  }
  if (
    (formSettings as any)[name].maxLength &&
    tmpVal.length > (formSettings as any)[name].maxLength
  ) {
    err = 'moc dlouhé'
  }
  if ((formSettings as any)[name].required && ['', null].includes(value)) {
    err = 'vyžadováno'
  }
  return err
}

export const validateAllFields = (formSettings:object, fieldsVal:object, fieldsErr:object, close:boolean)=>{
  let passed = true
  let errors = {}
  Object.entries(formSettings).forEach(([name, item]) => {
    const currentValue = (fieldsVal as any)[name] || ''
    const currentError = (fieldsErr as any)[name]
    if (currentError === null) {
      // prozkoumej
      const err = fieldValidation(formSettings, name, currentValue)
      if (err !== '') {
        passed = false
        if (close) {
          errors = { ...errors, [name]: err }
        }
      }
    } else if (currentError === '') {
      ///safe
    } else {
      passed = false
    }
  })
  return {passed, errors}
}
