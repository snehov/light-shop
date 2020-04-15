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
import addi18toInputs from 'i18n/addi18toInputs'

const inputsConf = {
  name: { required: true, minLength: 5, label: 'company.name' },
  crn: { required: true, type: 'number', minLength: 5, label: 'company.crn' },
  utr: { minLength: 5, label: 'company.utr' },
}
const CompanyBaseInfo = forwardRef(
  (
    {
      dataName,
      returnValues,
      hidden,
      prefillData,
    }: {
      dataName: string
      returnValues: Function
      hidden?: boolean
      prefillData?: any
    },
    ref,
  ) => {
    const [formValid, setFormValid] = useState(false)
    const { t } = useTranslation()
    const inputsConfig = addi18toInputs(inputsConf, t)
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
    const crn = useField('crn', form)
    const utr = useField('utr', form)

    return (
      <div className={`formBlock ${hidden ? 'hidden' : ''}`}>
        <h3>{t('company.companyInfo')}</h3>
        <InputFF field={name} config={inputsConfig} g={dataName} />
        <InputFF field={crn} config={inputsConfig} g={dataName} />
        <InputFF field={utr} config={inputsConfig} g={dataName} />
      </div>
    )
  },
)

export default CompanyBaseInfo
