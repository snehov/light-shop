import React, {
  useEffect,
  useState,
  useRef,
  useDispatch,
  useGlobal,
} from 'reactn'
import { Address, PersonalInfo, CompanyBaseInfo } from './forms'
import { debounce } from 'utils/formsFnc'
const isEmpty = require('ramda').isEmpty

const debounceFnc = debounce((launchDebounced: any) => {
  launchDebounced()
}, 1000)

const DeliveryInfo = () => {
  const [copyInvoiceAddr, setCopyInvoiceAddr] = useState(true)
  const [companyVisible, setCompanyVisible] = useState(false)
  const [formParts, setFormParts] = useState({})
  const [allFormsAreValid, setAllFormsAreValid] = useState(false)
  const saveAddressInfo = useDispatch('saveAddressInfo')
  const [ {addressName} ] = useGlobal('orderInfo')
  useEffect(() => {
    // prazdne je to UNDEFINED
    console.log('addressName', addressName)
  }, [addressName])

  useEffect(() => {
    setAllFormsAreValid(checkAllFormsValid())
    !isEmpty(formParts) &&
      debounceFnc(() => {
        const currentParts = Object.values(formParts).reduce(
          (acc: any, curr) => {
            console.log('curr je', (curr as any).name, (curr as any).data)
            return { ...acc, [(curr as any).name]: (curr as any).data }
          },
          {},
        )
        console.log('debounced api call', currentParts)
        saveAddressInfo(currentParts as object)
      })
    //console.log('formParts', formParts)
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
    return passed
  }

  const submitData = () => {
    console.log('SUBMIT form', formParts)
  }
  const validatePersonal = useRef()
  const validateDelivery = useRef()
  const validateInvoice = useRef()
  const validateCompany = useRef()
  const onScreenValidation = () => {
    ;(validatePersonal as any).current.runValidation()
    ;(validateDelivery as any).current.runValidation()
    ;(validateInvoice as any).current.runValidation()
    if ((validateCompany as any).current) {
      ;(validateCompany as any).current.runValidation()
    }
  }
  const allowedToFinish = allFormsAreValid
  return (
    <div>
      <div className="elemsToRow">
        <PersonalInfo
          dataName="personal"
          returnValues={setValues}
          ref={validatePersonal}
        />
        <Address
          dataName="delivery"
          returnValues={setValues}
          prefillData={addressName}
          ref={validateDelivery}
        />
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
            ref={validateInvoice}
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
          <CompanyBaseInfo
            dataName="company"
            returnValues={setValues}
            ref={validateCompany}
          />
        )}
      </div>
      <cite>
        Next steps:
        <br />
        1) make endpoint for saving form data;{' '}
        <b>BE should re-check data validity again</b>
        <br />
        <s>2) sync it on blur, but better with DEBOUNCE on 2sec </s>
        <br />
        3) make endpoint for send/close order
        <br />
        4) after refresh prefill already sent data
        <br />
        5) from server sent link to terms&amp;conditions which you can
        click/redirect (_blank/lightbox) other) on first load, let server
        generate known values to JSON to &lt;script&gt;
        <br />
        -------> and in react ask if (JSON available) -parse it and load -ELSE-
        send BE request for them <br />
        another) prevent session expire by saving basic values to localStorage
        (make it friendly with previous point)
        <br />
        BE) make work sending proper data types
        <br />
        CSS) make perfect styling for form in checkbox/radio...
      </cite>
      <br />
      <br />
      <br />
      {!allowedToFinish && <div>ještě není vše vyplněno</div>}
      {allowedToFinish ? (
        <button className="formSubmit formSubmit--ready" onClick={submitData}>
          Objednat
        </button>
      ) : (
        <button
          className="formSubmit  formSubmit--notReady"
          onClick={onScreenValidation}
        >
          Objednat
        </button>
      )}
    </div>
  )
}
export default DeliveryInfo
