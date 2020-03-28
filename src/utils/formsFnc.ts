const isEmpty = require('ramda').isEmpty

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
  let tmpVal = value.toString().trim()
  const nameKey = (formSettings as any)[name]
  const required = nameKey.required

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

// implementation specifics of chosen form sys, here is react-final-form-hooks
export const finalFormValidation = (
  values: any,
  setFormValid: any,
  form: any,
  inputsConfig: object,
) => {
  if (isEmpty(form)) {
    return undefined
  }
  const { errors, passed } = validateAllFields(inputsConfig, values)
  setFormValid(passed)
  return passed ? undefined : errors
}
export const areObjectsEqual = (a: any, b: any) => {
  let s = (o: any) =>
    Object.entries(o)
      .sort()
      .map(i => {
        if (i[1] instanceof Object) i[1] = s(i[1])
        return i
      })
  return JSON.stringify(s(a)) === JSON.stringify(s(b))
}
//export const ad
// TS versin of debounce
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor)
    })
}
/* 
//JS version of debounce
export const debounce = (func, delay) => {
  let inDebounce
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() =>
      func.apply(context, args)
    , delay)
  }
} */
export const fromApiAddrToAppAddrForm = (api: any) => {
  return Object.entries(api).reduce((acc, [key, value]) => {
    return { ...acc, [key]: { data: value, name: key, dataValid: false } }
  }, {})
}
