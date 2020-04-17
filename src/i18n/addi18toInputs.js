const addi18toInputs = (config, t) => {
  return  Object.entries(config).reduce((accField, [fieldKey, fieldVal]) => {
    return {
      ...accField,
      [fieldKey]: Object.entries(fieldVal).reduce(
        (accAttr, [attrKey, attrVal]) => {
          let value = attrVal
          if (['label', 'placeholder','equalsToErr'].includes(attrKey)) {
            value = t(attrVal)
          }
          return { ...accAttr, [attrKey]: value }
        },
        {},
      ),
    }
  }, {})
}
export default addi18toInputs
