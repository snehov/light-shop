import React, { useState } from 'react'
import Address from './Address'

const PersonalData = () => {
  const [formPartsData, setFormPartsData] = useState({})
  const [formPartsValid, setFormPartsValid] = useState({
    delivery: false,
    invoice: false,
  })
  const saveFormData = (name: string, data: object, passed: boolean) => {
    console.log('save form data', name, data, passed)
    setFormPartsData({ ...formPartsData, [name]: data })
    setFormPartsValid({ ...formPartsValid, [name]: passed })
  }

  return (
    <div>
      <h2>osobní udaje</h2>
      <div>
        <h3>Adresa doručení</h3>
        <Address addresType="delivery" saveFormData={saveFormData} />
      </div>
      <button disabled={formPartsValid.delivery ? false : true}>další</button>
      <div>
        <h3>Fakturační údaje</h3>
        <Address addresType="invoce" saveFormData={saveFormData} />
      </div>
    </div>
  )
}

export default PersonalData
