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
  fromFullFormatToSimple,
  hasAllEmptyValues,
  setAllValuesEmpty,
  removeFormPart,
} from 'utils/formsFnc'
import {
  FormPartType,
  FormPartsType,
  DeliveryInfoType,
  OrderInfoType,
} from 'utils/types'
const isEmpty = require('ramda').isEmpty

const debounceFnc = debounce((launchDebounced: any) => {
  launchDebounced()
}, 1000)

const checkAllFormsValid = (noDeliveryAddress: boolean) => {
  let requiredParts = ['personal', 'invoice']
  !noDeliveryAddress && requiredParts.push('delivery')
  const CV = checkAllFormPartsValid(requiredParts, formParts)
  console.log('requiredParts', requiredParts, formParts, CV)

  return CV
}

let formParts: FormPartsType = {}
const setFormParts = (
  newVersion: FormPartsType,
  updateValidStatus: any,
  noDeliveryAddress: boolean,
) => {
  formParts = newVersion
  if (updateValidStatus) {
    updateValidStatus(checkAllFormsValid(noDeliveryAddress))
  }
}

const DeliveryInfo = ({ disabled }: { disabled?: boolean }) => {
  const [copyInvoiceAddr, setCopyInvoiceAddr] = useState(true)
  const [noDeliveryAddress, setNoDeliveryAddress] = useState(false)
  const [companyVisible, setCompanyVisible] = useState<boolean | undefined>(
    undefined,
  )
  //const [formParts, setFormParts] = useState({}) // unreliable as state, moved to variable
  const [allFormsAreValid, setAllFormsAreValid] = useState(false)
  const saveAddressInfo = useDispatch('saveAddressInfo')
  const submitOrderToServer = useDispatch('submitOrder')
  const [{ addressName }] = useGlobal('orderInfo')
  const [isSubmittingOrder] = useGlobal('isSubmittingOrder')
  const [selectedDelivery] = useGlobal('selectedDelivery')
  const [deliveryMethods] = useGlobal('deliveryMethods')

  useEffect(() => {
    console.log('addresname', addressName)
    // when getting init data from BE find out whether delivery/invoice are different, or copied, then preselect copy option
    if (addressName) {
      const an = addressName
      if (an.invoice && an.delivery) {
        const cr = areObjectsEqual(an?.invoice, an?.delivery)
        !cr && setCopyInvoiceAddr(false)
      }
      // show company info when preselected data exists
      if (an.company && !isEmpty(an.company)) {
        //setCompanyVisible(true)
      }
      //first time set up form data from BE to local (if exists)
      if (isEmpty(formParts) && !isEmpty(addressName)) {
        setFormParts(
          fromApiAddrToAppAddrForm(addressName),
          setAllFormsAreValid,
          noDeliveryAddress,
        )
      }
    }
  }, [addressName]) // eslint-disable-line

  useEffect(() => {
    console.log('deliveryMethods', deliveryMethods)
    if (!isEmpty(deliveryMethods)) {
      const methodInfo = deliveryMethods.filter(
        m => m.delivery_id == selectedDelivery, // eslint-disable-line
      )[0]
      if (methodInfo?.personal_pickup) {
        setCopyInvoiceAddr(false)
        setNoDeliveryAddress(true)
        setFormParts(
          removeFormPart(formParts, 'delivery'),
          setAllFormsAreValid,
          true,
        )
        // setAllFormsAreValid(checkAllFormsValid(true))
      } else {
        setNoDeliveryAddress(false)
        setFormParts(formParts, setAllFormsAreValid, false)
        // setAllFormsAreValid(checkAllFormsValid(false))
      }
    }
  }, [selectedDelivery, deliveryMethods]) // eslint-disable-line

  const saveDataToServer = () => {
    !isEmpty(formParts) &&
      debounceFnc(() => {
        const dataSend = fromFullFormatToSimple(formParts)
        console.log('debounced API call to save data', dataSend)
        saveAddressInfo(dataSend)
      })
  }

  useEffect(() => {
    if (companyVisible === undefined) {
      addressName?.company &&
        setCompanyVisible(!hasAllEmptyValues(addressName.company))
    } else if (companyVisible === false) {
      if (formParts.company) {
        /* const emptyCompany = {
          ...(formParts as any)?.company,
          data: setAllValuesEmpty((formParts as any)?.company?.data),
        } */
        let withoutCompany = { ...formParts }
        delete withoutCompany.company
        console.log('empty company', withoutCompany)
        //setValues(emptyCompany, true)
        setFormParts(withoutCompany, setAllFormsAreValid, noDeliveryAddress)
        saveDataToServer()
      }
    }
  }, [companyVisible /* , addressName */]) // eslint-disable-line

  const setValues = (values: FormPartType, sendToServer: boolean = false) => {
    const from = values.name
    let saveData
    if (copyInvoiceAddr && from === 'delivery') {
      const invoice = { ...values, name: 'invoice' }
      saveData = { ...formParts, [values.name]: values, invoice }
    } else {
      saveData = { ...formParts, [values.name]: values }
    }
    setFormParts(saveData, setAllFormsAreValid, noDeliveryAddress)
    if (sendToServer) {
      saveDataToServer()
    }
  }

  const submitData = () => {
    const dataSend = fromFullFormatToSimple(formParts)
    console.log('SUBMIT form', dataSend)
    submitOrderToServer(dataSend)
  }

  const validatePersonal = useRef()
  const validateDelivery = useRef()
  const validateInvoice = useRef()
  const validateCompany = useRef()
  const onScreenValidation = () => {
    ;(validatePersonal as any).current.runValidation()
    if (!noDeliveryAddress) {
      ;(validateDelivery as any).current.runValidation()
    }
    ;(validateInvoice as any).current.runValidation()
    if ((validateCompany as any).current /* && companyVisible */) {
      console.log('validate company on screen')
      //&& (formParts as any).company)
      ;(validateCompany as any).current.runValidation()
    }
  }
  console.log('DD', deliveryMethods, selectedDelivery)
  const dm = isEmpty(deliveryMethods)
    ? []
    : deliveryMethods.filter(
        m => m.delivery_id == selectedDelivery, // eslint-disable-line
      )
  const pickupLine = dm.length === 0 ? 'adesa...' : dm[0].description // eslint-disable-line
  return (
    <div className={disabled ? 'deliveryInfoInputs disabledBlock' : 'deliveryInfoInputs'}>
      {disabled && (
        <div
          className="disabledBlock__message"
          title="Dokončete výběr dopravy a platby"
        >
          Dokončete výběr dopravy a platby
        </div>
      )}
      <div className="elemsToRow">
        <div className="stdPadding">
          <PersonalInfo
            dataName="personal"
            returnValues={setValues}
            prefillData={addressName}
            ref={validatePersonal}
          />
        </div>
        <div className="stdPadding">
          {noDeliveryAddress ? (
            <div className="formBlock">
              <h3>Adresa vyzvednutí</h3>
              <p dangerouslySetInnerHTML={{ __html: pickupLine }}>
                {/* !isEmpty(deliveryMethods) &&
                  deliveryMethods.filter(
                    m => m.delivery_id == selectedDelivery, // eslint-disable-line
                  )[0].description */}
              </p>
            </div>
          ) : (
            <Address
              dataName="delivery"
              returnValues={setValues}
              prefillData={addressName}
              ref={validateDelivery}
            />
          )}
        </div>

        <div className="stdPadding">
          {!noDeliveryAddress && (
            <label className="inputCont cy-invAsDeliv">
              Fakturační adresa je stejná jako dodací adresa
              <input
                type="checkbox"
                checked={copyInvoiceAddr}
                onChange={e => setCopyInvoiceAddr(e.target.checked)}
              />
              <span className="checkmark"></span>
            </label>
          )}

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
        </div>
        <div className="stdPadding">
          <label className="inputCont cy-fillCompany">
            Objednávka na firmu
            <input
              type="checkbox"
              checked={Boolean(companyVisible)}
              onChange={e => setCompanyVisible(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
          {companyVisible && (
            <CompanyBaseInfo
              dataName="company"
              returnValues={setValues}
              prefillData={addressName}
              ref={validateCompany}
            />
          )}
        </div>
      </div>

      {!allFormsAreValid && <div>ještě není vše vyplněno</div>}
      {isSubmittingOrder ? (
        <button className="formSubmit formSubmit--submitting" disabled>
          Odesílá se...
        </button>
      ) : allFormsAreValid ? (
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

      <br />
      <br />
      <b style={{ color: 'red' }}>...</b>
      <br />
      <cite>
        Next steps:
        <br />
        1) <s>submit endpoint</s>, validate FE data and process order, on FE
        redirect to succes screen
        <br />
        2) from server sent link to terms&amp;conditions to click/redirect
        (_blank/lightbox) other)
        <br />
        another) prevent session expire by saving basic values to localStorage
        (make it friendly with previous point)
        <br />
        BE) <s>make work sending proper data types</s>, and on FE try to
        forcheck and event. stop app notice wrong data and prevent app from
        failing
      </cite>
      <br />
    </div>
  )
}
export default DeliveryInfo
