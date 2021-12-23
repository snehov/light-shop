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
  descr: {
    label: 'address.place',
    placeholder: 'address.place_ph',
  },
  street: {
    required: true,
    minLength: 2,
    label: 'address.street',
    placeholder: 'address.street_ph',
  },
  city: {
    label: 'address.city',
    required: true,
    placeholder: 'address.city_ph',
  },
  zip: {
    label: 'address.zip',
    type: 'number',
    minLength: 5,
    maxLength: 5,
    required: true,
    placeholder: 'address.zip_ph',
  },
  country: {
    label: 'address.country',
    placeholder: 'address.country_ph',
    required: true,
  },
}

const Address = forwardRef(
  (
    {
      dataName,
      returnValues,
      copyValues,
      copyContent,
      hidden,
      altName,
      prefillData,
    }: {
      dataName: string
      returnValues: Function
      copyValues?: boolean
      copyContent?: any
      hidden?: boolean
      altName?: string
      prefillData?: any
    },
    ref
  ) => {
    const [formValid, setFormValid] = useState(false)
    const { t } = useTranslation()
    const inputsConfig = addi18toInputs(inputsConf, t)
    let formSource = {}
    const { form, handleSubmit, values } = useForm({
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

    useEffect(() => {
      if (copyValues && copyContent) {
        Object.entries(copyContent.data).forEach(([key, data]) => {
          form.change(key, copyContent.data[key])
        })
      }
    }, [copyContent, copyValues]) // eslint-disable-line

    const descr = useField('descr', form)
    const street = useField('street', form)
    const city = useField('city', form)
    const zip = useField('zip', form)
    const country = useField('country', form)

    return (
      <div className={`formBlock ${hidden ? 'hidden' : ''}`}>
        <h3>{altName || t('address.addresDelivery')}</h3>
        <InputFF field={descr} config={inputsConfig} g={dataName} />
        <InputFF field={street} config={inputsConfig} g={dataName} />
        <InputFF field={city} config={inputsConfig} g={dataName} />
        <InputFF field={zip} config={inputsConfig} g={dataName} />
        <InputFF field={country} config={inputsConfig} g={dataName} />
      </div>
    )
  }
)

export default Address
