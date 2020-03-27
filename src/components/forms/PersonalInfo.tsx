import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { useForm, useField } from 'react-final-form-hooks'
import { finalFormValidation } from 'utils/formsFnc'
import { InputFF } from 'components/ui-components'

const inputsConfig = {
  name: {
    required: true,
    minLength: 2,
    label: 'Jméno a příjmení',
    placeholder: 'Jméno Příjmení',
  },
  tel: {
    required: true,
    type: 'tel',
    placeholder: '+420',
    default: '+420 ',
    label: 'Telefon',
  },
  email: {
    type: 'email',
    label: 'e-mail',
    placeholder: 'např.: franta@example.cz',
  },
}
const PersonalInfo = forwardRef(
  (
    {
      dataName,
      returnValues,
    }: {
      dataName: string
      returnValues: Function
    },
    ref,
  ) => {
    const [formValid, setFormValid] = useState(false)
    let formSource = {}
    const { form, values, handleSubmit } = useForm({
      onSubmit: (values: any) => {},
      validate: (values: any) =>
        finalFormValidation(values, setFormValid, formSource, inputsConfig),
    })
    formSource = form
    useImperativeHandle(ref, () => ({
      runValidation() {
        handleSubmit()
      },
    }))
    useEffect(() => {
      returnValues({
        data: values,
        name: dataName,
        dataValid: formValid,
      })
    }, [formValid, values]) // eslint-disable-line
    // Change values programatically =>// form.change('firstName', 'nekdo jiný')

    const name = useField('name', form)
    const tel = useField('tel', form)
    const email = useField('email', form)

    return (
      <div className="formBlock">
        <h3>Základní údaje</h3>
        <InputFF field={name} config={inputsConfig} />
        <InputFF field={tel} config={inputsConfig} />
        <InputFF field={email} config={inputsConfig} />
      </div>
    )
  },
)

export default PersonalInfo