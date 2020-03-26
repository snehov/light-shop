import React, { useEffect, useState } from 'react'
import { useForm, useField } from 'react-final-form-hooks'
import { finalFormValidation } from 'utils/formsFnc'
import { InputFF } from 'components/ui-components'

const inputsConfig = {
  street: {
    required: true,
    minLength: 2,
    label: 'Ulice a č.p.',
    placeholder: 'např.: Stoupající 983/25',
  },
  city: { required: true, placeholder: '+420 ' },
  zip: { type: 'number', minLength: 5, maxLength: 5, required: true },
}
const Address = ({
  dataName,
  returnValues,
}: {
  dataName: string
  returnValues: Function
}) => {
  const [formValid, setFormValid] = useState(false)
  let formSource = {}
  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit: (values: any) => {},
    validate: (values: any) =>
      finalFormValidation(values, setFormValid, formSource, inputsConfig),
  })
  formSource = form
  useEffect(() => {
    returnValues({ [dataName]: { data: values }, dataValid: formValid })
  }, [formValid, values]) // eslint-disable-line
  // Change values programatically =>// form.change('firstName', 'nekdo jiný')

  const street = useField('street', form)
  const city = useField('city', form)
  const zip = useField('zip', form)

  return (
    <div>
      <h3>Adresa</h3>
      <InputFF field={street} config={inputsConfig} />
      <InputFF field={city} config={inputsConfig} />
      <InputFF field={zip} config={inputsConfig} />
    </div>
  )
}

export default Address
