// check and possibly try to re-define input data type according to demanded TYPE
export const forceTypes = (param: any, type: any) => {
  if (typeof param === 'object') {
    let sanitized = { ...param }
    Object.entries(type).forEach(([key, value]) => {
      let defType = typeof (type as any)[key]
      let checkType = typeof param[key]
      if (defType !== checkType) {
        if (defType === 'number') {
          sanitized = { ...sanitized, [key]: numConversion(param[key]) }
        }
        if (defType === 'string') {
          sanitized = { ...sanitized, [key]: stringConversion(param[key]) }
        }
        //console.log('!!!sanitized were used!!!', sanitized)
      }
      //console.log('TU: def', key, defType, 'vs. real', param[key], checkType)
    })
    return sanitized
  } else {
    let sanitized = param
    const defType = typeof type
    const checkType = typeof param
    if (defType !== checkType) {
      if (defType === 'number') {
        sanitized = numConversion(param)
      } else if (defType === 'string') {
        sanitized = stringConversion(param)
      }
      //console.log('!!!sanitized were used!!!', sanitized)
    }
    return sanitized
  }
}

export const ft = forceTypes
//const numConversion:Number =(expr:any) => Number(expr)
function numConversion(expr: any): number {
  return Number(expr)
}
function stringConversion(expr: any): string {
  return expr.toString()
}
