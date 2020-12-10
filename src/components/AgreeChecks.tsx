import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useGlobal,
} from 'reactn'
import { useTranslation } from 'react-i18next'
import { useForm, useField } from 'react-final-form-hooks'
import { finalFormValidation, changedByUserInput } from 'utils/formsFnc'
import { InputFF } from 'components/ui-components'
import addi18toInputs from 'i18n/addi18toInputs'

const inputsConf = {
  terms: {
    required: true,
    type: 'checkbox',
  },
  mktg: {
    required: false,
    type: 'checkbox',
    label: 'orderInfo.agreeMarketing',
  },
  comment: {
    required: false,
    type: 'textarea',
    label: 'orderInfo.comment',
    rows: 2,
  },
}
const AgreeChecks = forwardRef(
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
    ref
  ) => {
    const [formValid, setFormValid] = useState(false)
    const [{ terms }] = useGlobal('orderInfo')
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
        changedByUserInput(form, values) ? true : false
      )
    }, [formValid, values]) // eslint-disable-line

    const termsConditions = useField('terms', form)
    const mktg = useField('mktg', form)
    const comment = useField('comment', form)

    return (
      <div className="formBlock">
        <InputFF
          field={comment}
          config={inputsConfig}
          g={dataName}
          style={{ maxWidth: 'initial' }}
        />
        <InputFF
          field={mktg}
          config={inputsConfig}
          g={dataName}
          style={{ maxWidth: 'initial' }}
        />
        <InputFF
          field={termsConditions}
          config={inputsConfig}
          g={dataName}
          style={{ maxWidth: 'initial' }}
        >
          {terms && (
            <>
              {terms.label}
              <a
                href={terms.url}
                className={terms.class}
                rel={terms.rel}
                target={terms.target}
              >
                {terms.clickable}
              </a>
            </>
          )}
        </InputFF>
      </div>
    )
  }
)

export default AgreeChecks
