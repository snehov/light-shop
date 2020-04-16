import {
  FormPartType,
  FormPartsType,
  DeliveryInfoType,
  OrderInfoType,
} from 'utils/types'
import { FormApi } from 'final-form'

const isEmpty = require('ramda').isEmpty
const isNil = require('ramda').isNil

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
  fieldsVal?: object,
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
    if (nameKey.equalsTo && tmpVal !== (fieldsVal as any)[nameKey.equalsTo]) {
      err = nameKey.equalsToErr
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
    const err = fieldValidation(formSettings, name, currentValue, fieldsVal)
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

// form is assembled from form parts, this check if exists and its inputs are valid
export const checkAllFormPartsValid = (
  requiredParts: Array<string>,
  formParts: FormPartsType,
) => {
  let passed = true
  const currentParts = Object.values(formParts).reduce((acc: any, curr) => {
    return [...acc, curr?.name]
  }, [])
  //all required form parts are present
  requiredParts.forEach((part) => {
    if (!(currentParts as any).includes(part)) {
      passed = false
    }
  })
  // all available form parts are valid
  if (!Object.values(formParts).every((item) => (item as any).dataValid)) {
    passed = false
  }
  return passed
}

// dont save input to BE, after input recceived prefilled values
export const changedByUserInput = (form: FormApi, values: object) => {
  let save = false
  Object.keys(values).forEach((item) => {
    if (form.getFieldState(item)?.dirty === true) {
      save = true
    }
  })
  return save
  // FORM INPUT attributes related to initial values
  // by setInitialValues
  // dirty:false, initial:"TOTAL jarmil", modified:false, pristine: true, touched:false, visited:false, value: "TOTAL jarmil"

  // by form.change(..)
  // dirty: true, initial:undefined      ,modified:false, pristine: false, touched: false, visited:false

  // withou setiing, but typing
  // dirty:true, initial:undefined,      modified:true,   pristine: false, touched:false, visited:false, value "ds"

  // dirty- bude modifikovano od initial stata
  // modified - bude asi userem pres typing
  // pristine - same value as init (init je starnardne undefined a hned dostane "")
  // touched - uz jednou ztratil focus
  // visited - uz jednou dostal focus
}

// compare two object and check if equal
export const areObjectsEqual = (a: any, b: any) => {
  let s = (o: any) =>
    Object.entries(o)
      .sort()
      .map((i) => {
        if (i[1] instanceof Object) i[1] = s(i[1])
        return i
      })
  return JSON.stringify(s(a)) === JSON.stringify(s(b))
}

// TS versin of debounce
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
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

// transform from BE format to internal format (one level deeper structure)
export const fromApiAddrToAppAddrForm = (api: DeliveryInfoType) => {
  return Object.entries(api).reduce((acc, [key, value]) => {
    return { ...acc, [key]: { data: value, name: key, dataValid: undefined } }
  }, {})
}

export const fromFullFormatToSimple = (formParts: FormPartsType) => {
  return Object.entries(formParts).reduce((acc, [key, value]) => {
    return { ...acc, [key]: { ...value?.data } }
  }, {})
}

export const setAllValuesEmpty = (object: object) => {
  return Object.keys(object).reduce((acc, cur) => {
    return { ...acc, [cur]: '' }
  }, {})
}

export const clearCompanyValues = (formParts: FormPartsType) => {
  if (!(formParts as any).company) {
    return formParts
  } else {
    return {
      ...formParts,
      company: {
        ...(formParts as any).company,
        data: setAllValuesEmpty((formParts as any).company?.data),
      },
    }
  }
}
export const removeFormPart = (
  formParts: FormPartsType,
  removePart: string,
) => {
  let without = { ...formParts }
  delete (without as any)[removePart]
  return without
}
export const hasAllEmptyValues = (object: object) => {
  return Object.values(object).every((value) => value === '' || isNil(value))
}
