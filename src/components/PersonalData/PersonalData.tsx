import React, { useEffect, useState } from 'react'
import { useForm, useField } from 'react-final-form-hooks'
import { finalFormValidation } from 'utils/formsFnc'
import { InputFF } from 'components/ui-components'

const inputsConfig = {
  firstName: { required: true, minLength: 2 },
  lastName: { minLength: 2 },
  street: { required: true },
  zip: { minLength: 5, maxLength: 5, type: 'number' },
  email: { type: 'email' },
}
const PersonalData = () => {
  const [formValid, setFormValid] = useState(false)
  let formSource = {}
  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit: (values: any) => {},
    validate: (values: any) =>
      finalFormValidation(values, setFormValid, formSource, inputsConfig),
  })
  formSource = form
  useEffect(() => {}, [values]) // listen to changed values
  // Change values programatically =>// form.change('firstName', 'nekdo jiný')

  const firstName = useField('firstName', form)
  const lastName = useField('lastName', form)
  const street = useField('street', form)
  const zip = useField('zip', form)
  const email = useField('email', form)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <InputFF field={firstName} label="Jméno" config={inputsConfig} />
          <InputFF field={lastName} label="Příjmení" config={inputsConfig} />
          <InputFF field={street} label="Ulice" config={inputsConfig} />
          <InputFF field={zip} label="PSČ" config={inputsConfig} />
          <InputFF field={email} label="emil" config={inputsConfig} />
        </div>
        <button type="submit" disabled={pristine || submitting || !formValid}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default PersonalData
