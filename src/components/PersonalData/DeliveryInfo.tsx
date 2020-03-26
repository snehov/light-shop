import React, { useEffect, useState } from 'react'
import PersonalData from './PersonalData'
import Address from './Address'

const DeliveryInfo = () => {
  const setValues = (values: object) => {
    console.log('set valuse', values)
  }
  return (
    <div>
      <form /* onSubmit={handleSubmit} */>
        <PersonalData dataName="personal" returnValues={setValues} />
        <Address dataName="deliverTo" returnValues={setValues}/>
      </form>
      <button
        type="submit"
        /*  disabled={pristine || submitting || !formValid} */
      >
        Submit
      </button>
    </div>
  )
}
export default DeliveryInfo
