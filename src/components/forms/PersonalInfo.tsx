import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, useField } from 'react-final-form-hooks'
import { finalFormValidation, changedByUserInput } from 'utils/formsFnc'
import { InputFF } from 'components/ui-components'
import addi18toInputs from "i18n/addi18toInputs"

const inputsConf = {
  name: {
    required: true,
    minLength: 2,
    label: 'personal.nameSurname',
    placeholder: 'personal.nameSurname',
  },
  tel: {
    required: true,
    type: 'tel',
    placeholder: '+420',
    minLength: 9,
    default: '+420 ',
    label: 'personal.tel',
  },
  email: {
    required: true,
    type: 'email',
    label: 'personal.email',
    placeholder: 'personal.email_ph',
  },
}
const PersonalInfo = forwardRef(
  (
    {
      dataName,
      returnValues,
      prefillData,
    }: {
      dataName: string
      returnValues: Function
      prefillData?: any
    },
    ref,
  ) => {
    const [formValid, setFormValid] = useState(false)
    const { t } = useTranslation()
    const inputsConfig = addi18toInputs(inputsConf,t)
    let formSource = {}
    const { form, values, handleSubmit } = useForm({
      onSubmit: (values: any) => {},
      validate: (values: any) =>
        finalFormValidation(values, setFormValid, formSource, inputsConfig),
    })
    formSource = form
    useEffect(() => {
      prefillData?.[dataName] &&
        form.setConfig('initialValues', prefillData[dataName])
    }, [form, prefillData]) // eslint-disable-line

    useImperativeHandle(ref, () => ({
      runValidation() {
        handleSubmit()
      },
    }))

    useEffect(() => {
      returnValues(
        {
          data: values,
          name: dataName,
          dataValid: formValid,
        },
        changedByUserInput(form, values) ? true : false,
      )
    }, [formValid, values]) // eslint-disable-line

    const name = useField('name', form)
    const tel = useField('tel', form)
    const email = useField('email', form)

    return (
      <div className="formBlock">
        <h3>{t('personal.personalInfo')}</h3>
        <InputFF field={name} config={inputsConfig} g={dataName} />
        <InputFF field={tel} config={inputsConfig} g={dataName} />
        <InputFF field={email} config={inputsConfig} g={dataName} />
      </div>
    )
  },
)

export default PersonalInfo
