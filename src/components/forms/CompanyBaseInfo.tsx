import React, { useEffect, useState } from 'react'
import { useForm, useField } from 'react-final-form-hooks'
import { finalFormValidation } from 'utils/formsFnc'
import { InputFF } from 'components/ui-components'

const inputsConfig = {
  name: { required: true, minLength: 5, label: 'Obchodní název' },
  crn: { required: true, type: 'number', minLength: 5, label: 'IČ' },
  utr: { minLength: 5, label: 'DIČ' },
}
const CompanyBaseInfo = ({
  dataName,
  returnValues,
  hidden,
}: {
  dataName: string
  returnValues: Function
  hidden?:boolean
}) => {
  const [formValid, setFormValid] = useState(false)
  let formSource = {}
  const { form, values } = useForm({
    onSubmit: (values: any) => {},
    validate: (values: any) =>
      finalFormValidation(values, setFormValid, formSource, inputsConfig),
  })
  formSource = form
  useEffect(() => {
    returnValues({
      data: values,
      name: dataName,
      dataValid: formValid,
    })
  }, [formValid, values]) // eslint-disable-line

  const name = useField('name', form)
  const crn = useField('crn', form)
  const utr = useField('utr', form)

  return (
    <div className={`formBlock ${hidden ? 'hidden' : ''}`}>
      <h3>Informace o firmě</h3>
      <InputFF field={name} config={inputsConfig} />
      <InputFF field={crn} config={inputsConfig} />
      <InputFF field={utr} config={inputsConfig} />
    </div>
  )
}

export default CompanyBaseInfo
