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
  descr: {
    label: 'Popis místa',
    placeholder: 'např.: firma/vchod/recepce/patro',
  },
  street: {
    required: true,
    minLength: 2,
    label: 'Ulice a č.p.',
    placeholder: 'např.: Stoupající 983/25',
  },
  city: { label: 'Město', required: true, placeholder: 'Město' },
  zip: {
    label: 'PSČ',
    type: 'number',
    minLength: 5,
    maxLength: 5,
    required: true,
    placeholder: 'např.: 14900',
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
    ref,
  ) => {
    const [formValid, setFormValid] = useState(false)
    let formSource = {}
    const { form, handleSubmit, values, pristine, submitting } = useForm({
      onSubmit: (values: any) => {},
      validate: (values: any) =>
        finalFormValidation(values, setFormValid, formSource, inputsConfig),
    })
    formSource = form
    //const defaults = prefillData && prefillData[dataName]
    useEffect(() => {
      console.log(
        'getting prefiled datat',
        dataName,
        prefillData,
        prefillData && prefillData[dataName],
      )
      if (prefillData && prefillData[dataName]) {
        console.log(
          form,
          'jsemv tom ifu',
          form.getRegisteredFields(),
          prefillData[dataName],
        )
        //doesnt work here, because form fields are not added here yet
        form.getRegisteredFields().forEach(key => {
          form.change(key, prefillData[dataName][key])
        })
      }
    }, []) // eslint-disable-line
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
    useEffect(() => {
      if (copyValues && copyContent) {
        Object.entries(copyContent.data).forEach(([key, data]) => {
          form.change(key, copyContent.data[key])
        })
      }
    }, [copyContent]) // eslint-disable-line
    const descr = useField('descr', form)
    const street = useField('street', form)
    const city = useField('city', form)
    const zip = useField('zip', form)
    console.log('form.getRegisteredFields()', form.getRegisteredFields())
    return (
      <div className={`formBlock ${hidden ? 'hidden' : ''}`}>
        <h3>{altName || 'Adresa doručení'}</h3>
        <InputFF field={descr} config={inputsConfig} /* defaults={defaults} */ />
        <InputFF field={street} config={inputsConfig} />
        <InputFF field={city} config={inputsConfig} />
        <InputFF field={zip} config={inputsConfig} />
      </div>
    )
  },
)

export default Address
