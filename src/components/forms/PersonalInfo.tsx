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
    label: 'personal.name',
    placeholder: 'personal.name_ph',
  },
  surname: {
    required: true,
    minLength: 2,
    label: 'personal.surname',
    placeholder: 'personal.surname_ph',
  },
  tel: {
    required: true,
    type: 'tel',
    default: '+420 ',
    label: 'personal.tel',
    placeholder: 'personal.tel_ph',
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
    const surname = useField('surname', form)
    const tel = useField('tel', form)
    const email = useField('email', form)

    return (
      <div className="formBlock">
        <h3>{t('personal.personalInfo')}</h3>
        <InputFF field={name} config={inputsConfig} g={dataName} />
        <InputFF field={surname} config={inputsConfig} g={dataName} />
        <InputFF field={tel} config={inputsConfig} g={dataName} />
        <InputFF field={email} config={inputsConfig} g={dataName} />
      </div>
    )
  },
)

export default PersonalInfo
