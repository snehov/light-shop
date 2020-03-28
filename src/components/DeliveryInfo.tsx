import React, {
  useEffect,
  useState,
  useRef,
  useDispatch,
  useGlobal,
} from 'reactn'
import { Address, PersonalInfo, CompanyBaseInfo } from './forms'
import {
  areObjectsEqual,
  fromApiAddrToAppAddrForm,
  debounce,
  checkAllFormPartsValid,
  clearCompanyValues,
  hasAllEmptyValues,
} from 'utils/formsFnc'
const isEmpty = require('ramda').isEmpty

const debounceFnc = debounce((launchDebounced: any) => {
  launchDebounced()
}, 1000)

const DeliveryInfo = () => {
  const [copyInvoiceAddr, setCopyInvoiceAddr] = useState(true)
  const [companyVisible, setCompanyVisible] = useState<boolean | undefined>(
    undefined,
  )
  const [formParts, setFormParts] = useState({})
  const [allFormsAreValid, setAllFormsAreValid] = useState(false)
  const saveAddressInfo = useDispatch('saveAddressInfo')
  const [{ addressName }] = useGlobal('orderInfo')

  useEffect(() => {
    // when getting init data from BE find out whether delivery/invoice are different, or copied, then preselect copy option
    const an = addressName as any
    if (an.invoice && an.delivery) {
      const cr = areObjectsEqual(an?.invoice, an?.delivery)
      !cr && setCopyInvoiceAddr(false)
    }
    // show company info when preselected data exists
    if (an.company && !isEmpty(an.company)) {
      //setCompanyVisible(true)
    }
  }, [addressName])

  useEffect(() => {
    if (isEmpty(formParts) && !isEmpty(addressName)) {
      //first time set up form data from BE to local (if exists)
      setFormParts(fromApiAddrToAppAddrForm(addressName))
    } else if (
      areObjectsEqual(fromApiAddrToAppAddrForm(addressName), formParts)
    ) {
      // this is save after previous set-up, no actions needed now (avoiding data sending to BE)
    } else {
      setAllFormsAreValid(checkAllFormsValid())
      !isEmpty(formParts) &&
        debounceFnc(() => {
          const currentParts = Object.values(formParts).reduce(
            (acc: any, curr) => {
              return { ...acc, [(curr as any).name]: (curr as any).data }
            },
            {},
          )
          console.log('debounced API call to save data', currentParts)
          saveAddressInfo(currentParts as object)
        })
    }
  }, [formParts]) // eslint-disable-line

  useEffect(() => {
    console.log(
      'companyNOTVisible ',
      companyVisible,
      addressName,
      '##',
      hasAllEmptyValues((addressName as any).company),
    )
    if (companyVisible === undefined) {
      setCompanyVisible(!hasAllEmptyValues((addressName as any).company))
    } else if (companyVisible === false) {
      /* let withoutCompany = { ...formParts }
      delete (withoutCompany as any).company
      setFormParts(withoutCompany) */
      setFormParts(clearCompanyValues(formParts))
    }
  }, [companyVisible /* , addressName */]) // eslint-disable-line

  const setValues = (values: any) => {
    const from = values.name
    let saveData
    if (copyInvoiceAddr && from === 'delivery') {
      const invoice = { ...values, name: 'invoice' }
      saveData = { ...formParts, [values.name]: values, invoice }
    } else {
      saveData = { ...formParts, [values.name]: values }
    }
    setFormParts(saveData)
  }

  const checkAllFormsValid = () => {
    const requiredParts = ['personal', 'delivery', 'invoice']
    console.log(
      'validate all',
      formParts,
      checkAllFormPartsValid(requiredParts, formParts),
    )
    return checkAllFormPartsValid(requiredParts, formParts)
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
    if ((validateCompany as any).current /* && companyVisible */) {
      console.log("validate company on screen")
      //&& (formParts as any).company)
      ;(validateCompany as any).current.runValidation()
    }else{
      console.log("SKIP validate company on screen")
      /* let withoutCompany = { ...formParts }
      delete (withoutCompany as any).company
      setFormParts(withoutCompany) */
    }
    //checkAllFormsValid()
  }
  const allowedToFinish = allFormsAreValid // && isSending #later, dont forget
  return (
    <div>
      <div className="elemsToRow">
        <PersonalInfo
          dataName="personal"
          returnValues={setValues}
          prefillData={addressName}
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
            prefillData={addressName}
            ref={validateInvoice}
            copyValues={copyInvoiceAddr}
            hidden={copyInvoiceAddr}
            copyContent={(formParts as any).delivery}
          />
        }
        <input
          type="checkbox"
          checked={Boolean(companyVisible)}
          onChange={e => setCompanyVisible(e.target.checked)}
        />
        firma
        {companyVisible && (
          <CompanyBaseInfo
            dataName="company"
            returnValues={setValues}
            prefillData={addressName}
            ref={validateCompany}
          />
        )}
      </div>

      <b style={{ color: 'red' }}>in progress is...?</b>
      <br />
      <cite>
        Next steps:
        <br />
        1)<s> make endpoint for saving form data; </s>
        <b>BE should re-check data validity again</b>
        <br />
        <s>2) sync it on blur, but better with DEBOUNCE on 2sec </s>
        <br />
        3) make endpoint for send/close order
        <br />
        4){' '}
        <s>
          after refresh, prefill already sent data (be aware of copy invoice
          addre dependecy)
        </s>
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
