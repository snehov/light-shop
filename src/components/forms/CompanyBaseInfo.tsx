import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { useForm, useField } from 'react-final-form-hooks'
import { finalFormValidation, changedByUserInput } from 'utils/formsFnc'
import { InputFF } from 'components/ui-components'

const inputsConfig = {
  name: { required: true, minLength: 5, label: 'Obchodní název' },
  crn: { required: true, type: 'number', minLength: 5, label: 'IČ' },
  utr: { minLength: 5, label: 'DIČ' },
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
        <h3>Informace o firmě</h3>
        <InputFF field={name} config={inputsConfig} />
        <InputFF field={crn} config={inputsConfig} />
        <InputFF field={utr} config={inputsConfig} />
      </div>
    )
  },
)

export default CompanyBaseInfo
