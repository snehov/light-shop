import React, { useEffect, useState } from 'react'
import { Address, PersonalInfo, CompanyBaseInfo } from './forms'
//import Address from './Address'

const DeliveryInfo = () => {
  const [copyInvoiceAddr, setCopyInvoiceAddr] = useState(true)
  const [companyVisible, setCompanyVisible] = useState(false)
  const [formParts, setFormParts] = useState({})
  const [allFormsAreValid, setAllFormsAreValid] = useState(false)
  useEffect(() => {
    setAllFormsAreValid(checkAllFormsValid())
    console.log('formParts', formParts)
  }, [formParts]) // eslint-disable-line
  useEffect(() => {
    if (!companyVisible) {
      let withoutCompany = { ...formParts }
      delete (withoutCompany as any).company
      setFormParts(withoutCompany)
    }
  }, [companyVisible]) // eslint-disable-line
  const setValues = (values: any) => {
    const from = values.name
    if (copyInvoiceAddr && from === 'delivery') {
      const invoice = { ...values, name: 'invoice' }
      setFormParts({ ...formParts, [values.name]: values, invoice })
    } else {
      setFormParts({ ...formParts, [values.name]: values })
    }
  }
  const checkAllFormsValid = () => {
    let passed = true
    const requiredParts = ['personal', 'delivery', 'invoice']
    const currentParts = Object.values(formParts).reduce((acc: any, curr) => {
      return [...acc, (curr as any).name]
    }, [])
    //all required form parts are present
    requiredParts.forEach(part => {
      if (!(currentParts as any).includes(part)) {
        passed = false
      }
    })
    // all available form parts are valid
    if (!Object.values(formParts).every(item => (item as any).dataValid)) {
      passed = false
    }
    console.log('TOTAL PASSSED', passed)
    return passed
  }
  const allowedToFinish = allFormsAreValid
  return (
    <div>
      <form /* onSubmit={handleSubmit} */>
        <div className="elemsToRow">
          <PersonalInfo dataName="personal" returnValues={setValues} />
          <Address dataName="delivery" returnValues={setValues} />
          <div>
            <input
              type="checkbox"
              checked={copyInvoiceAddr}
              onChange={e => setCopyInvoiceAddr(e.target.checked)}
            />
            {/* Fakturační adresa je stejná jako dodací adresa */}
          </div>
          {
            <Address
              dataName="invoice"
              altName="Fakturační údaje"
              returnValues={setValues}
              copyValues={copyInvoiceAddr}
              hidden={copyInvoiceAddr}
              copyContent={(formParts as any).delivery}
            />
          }
          <input
            type="checkbox"
            checked={companyVisible}
            onChange={e => setCompanyVisible(e.target.checked)}
          />
          firma
          {companyVisible && (
            <CompanyBaseInfo dataName="company" returnValues={setValues} />
          )}
        </div>
      </form>
      {!allowedToFinish && <div>ještě není vše vyplněno</div>}
      <button type="submit" disabled={!allowedToFinish}>
        Objednat
      </button>
    </div>
  )
}
export default DeliveryInfo
