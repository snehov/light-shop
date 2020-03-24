import React from 'react'
import Address from './Address'

const PersonalData = () => {
  return (
    <div>
      <h2>osobní udaje</h2>
      <div>
        <h3>Adresa doručení</h3>
        <Address addresType="delivery" />
      </div>
      <div>
        <h3>Fakturační údaje</h3>
        <Address addresType="invoce" />
      </div>
    </div>
  )
}

export default PersonalData
