import React, {
  useEffect,
  useState,
  useRef,
  useDispatch,
  useGlobal,
} from 'reactn'
import { useTranslation } from 'react-i18next'
import { Address, PersonalInfo, CompanyBaseInfo } from './forms'
import {
  areObjectsEqual,
  fromApiAddrToAppAddrForm,
  debounce,
  checkAllFormPartsValid,
  fromFullFormatToSimple,
  hasAllEmptyValues,
  removeFormPart,
} from 'utils/formsFnc'
import { FormPartType, FormPartsType } from 'utils/types'
import SubmitButton from './SubmitButton'
import AgreeChecks from './AgreeChecks'
const isEmpty = require('ramda').isEmpty

const debounceFnc = debounce((launchDebounced: any) => {
  launchDebounced()
}, 1000)

const checkAllFormsValid = (
  noDeliveryAddress: boolean,
  skipParts?: Array<string>,
  noInputs?: boolean
) => {
  let requiredParts = ['agree']
  if (!noInputs) {
    requiredParts = ['personal', 'invoice']
    !noDeliveryAddress && requiredParts.push('delivery')
  }
  return skipParts
    ? checkAllFormPartsValid(requiredParts, formParts, skipParts)
    : checkAllFormPartsValid(requiredParts, formParts)
}

let formParts: FormPartsType = {}
const setFormParts = (
  newVersion: FormPartsType,
  updateValidStatus: any,
  setAllValidButAgree: any,
  noDeliveryAddress: boolean,
  noInputs?: boolean
) => {
  formParts = newVersion
  console.log('newVersion', newVersion)
  if (updateValidStatus) {
    updateValidStatus(checkAllFormsValid(noDeliveryAddress, [], noInputs))
    setAllValidButAgree(
      checkAllFormsValid(noDeliveryAddress, ['agree'], noInputs)
    )
  }
}

const InputForms = ({ disabled }: { disabled?: boolean }) => {
  const [copyInvoiceAddr, setCopyInvoiceAddr] = useState(true)
  const [noDeliveryAddress, setNoDeliveryAddress] = useState(false)
  const [companyVisible, setCompanyVisible] = useState<boolean | undefined>(
    undefined
  )
  //const [formParts, setFormParts] = useState({}) // unreliable as state, moved to variable
  const [allFormsAreValid, setAllFormsAreValid] = useState(false)
  const [allValidButAgree, setAllValidButAgree] = useState(false)
  const saveAddressInfo = useDispatch('saveAddressInfo')
  const submitOrderToServer = useDispatch('submitOrder')
  const [{ addressName }] = useGlobal('orderInfo')
  const [isSubmittingOrder] = useGlobal('isSubmittingOrder')
  const [selectedDelivery] = useGlobal('selectedDelivery')
  const [deliveryMethods] = useGlobal('deliveryMethods')
  const [onlyOnlineItems] = useGlobal('onlyOnlineItems')
  const { t } = useTranslation()
  useEffect(() => {
    //# when getting init data from BE find out whether delivery/invoice are different, or copied, then preselect copy option
    if (addressName) {
      const an = addressName
      if (an.invoice && an.delivery) {
        const cr = areObjectsEqual(an?.invoice, an?.delivery)
        !cr && setCopyInvoiceAddr(false)
      }
      //# show company info when preselected data exists
      if (an.company && !isEmpty(an.company)) {
        //setCompanyVisible(true)
      }
      //# first time set up form data from BE to local (if exists)
      if (isEmpty(formParts) && !isEmpty(addressName)) {
        setFormParts(
          fromApiAddrToAppAddrForm(addressName),
          setAllFormsAreValid,
          setAllValidButAgree,
          noDeliveryAddress,
          onlyOnlineItems
        )
      }
    }
  }, [addressName]) // eslint-disable-line

  useEffect(() => {
    if (!isEmpty(deliveryMethods)) {
      const methodInfo = deliveryMethods.filter(
        m => m.delivery_id == selectedDelivery // eslint-disable-line
      )[0]
      if (methodInfo?.personal_pickup) {
        setCopyInvoiceAddr(false)
        setNoDeliveryAddress(true)
        setFormParts(
          removeFormPart(formParts, 'delivery'),
          setAllFormsAreValid,
          setAllValidButAgree,
          true,
          onlyOnlineItems
        )
      } else {
        setNoDeliveryAddress(false)
        setFormParts(
          formParts,
          setAllFormsAreValid,
          setAllValidButAgree,
          false,
          onlyOnlineItems
        )
      }
    }
  }, [selectedDelivery, deliveryMethods]) // eslint-disable-line
  useEffect(() => {
    if (onlyOnlineItems) {
      //console.log('formparts', formParts, { agree: formParts?.agree })
      setFormParts(
        { agree: formParts?.agree, personal: formParts?.personal },
        setAllFormsAreValid,
        setAllValidButAgree,
        true,
        onlyOnlineItems
      )
    }
  }, [onlyOnlineItems]) // eslint-disable-line

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
        let withoutCompany = { ...formParts }
        delete withoutCompany.company
        setFormParts(
          withoutCompany,
          setAllFormsAreValid,
          setAllValidButAgree,
          noDeliveryAddress,
          onlyOnlineItems
        )
        saveDataToServer()
      }
    }
  }, [companyVisible]) // eslint-disable-line

  const setValues = (values: FormPartType, sendToServer: boolean = false) => {
    const from = values.name
    let saveData
    if (copyInvoiceAddr && from === 'delivery') {
      const invoice = { ...values, name: 'invoice' }
      saveData = { ...formParts, [values.name]: values, invoice }
    } else {
      saveData = { ...formParts, [values.name]: values }
    }
    setFormParts(
      saveData,
      setAllFormsAreValid,
      setAllValidButAgree,
      noDeliveryAddress
    )
    if (sendToServer) {
      saveDataToServer()
    }
  }

  const submitData = () => {
    const dataSend = fromFullFormatToSimple(formParts)
    submitOrderToServer(dataSend)
  }

  const validatePersonal = useRef()
  const validateDelivery = useRef()
  const validateInvoice = useRef()
  const validateCompany = useRef()
  const validateAgrees = useRef()
  const onScreenValidation = () => {
    if (!onlyOnlineItems) {
      ;(validatePersonal as any).current.runValidation()
      if (!noDeliveryAddress) {
        ;(validateDelivery as any).current.runValidation()
      }
      ;(validateInvoice as any).current.runValidation()
      if ((validateCompany as any).current /* && companyVisible */) {
        ;(validateCompany as any).current.runValidation()
      }
    }
    ;(validateAgrees as any).current.runValidation()
    ;(validatePersonal as any).current.runValidation()
  }
  const dm = isEmpty(deliveryMethods)
    ? []
    : deliveryMethods.filter(
        m => m.delivery_id == selectedDelivery // eslint-disable-line
      )
  const pickupLine = dm.length === 0 ? 'defaultni adresa...' : dm[0].description // eslint-disable-line

  return (
    <div
      className={
        disabled ? 'deliveryInfoInputs disabledBlock' : 'deliveryInfoInputs'
      }
    >
      {disabled && (
        <div className="disabledBlock__message" title={t('orderInfo.choseDaP')}>
          {t('orderInfo.choseDaP')}
        </div>
      )}

      {!onlyOnlineItems ? (
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
                <h3>{t('address.addressPickup')}</h3>
                <p dangerouslySetInnerHTML={{ __html: pickupLine }}></p>
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
                {t('company.invAddrAsDeliv')}
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
                altName={t('company.invoiceInfo')}
                returnValues={setValues}
                prefillData={addressName}
                ref={validateInvoice}
                copyValues={copyInvoiceAddr}
                hidden={copyInvoiceAddr}
                copyContent={(formParts as any).delivery}
              />
            }
          </div>
          {/* <div className="stdPadding">
            <label className="inputCont cy-fillCompany">
              {t('company.companyOrder')}
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
          </div> */}
        </div>
      ) : (
        // online products only
        <div className="elemsToRow">
          <div className="stdPadding">
            <PersonalInfo
              dataName="personal"
              returnValues={setValues}
              prefillData={addressName}
              ref={validatePersonal}
            />
          </div>
        </div>
      )}

      <div className="stdPadding">
        <AgreeChecks
          dataName="agree"
          returnValues={setValues}
          ref={validateAgrees}
        />
      </div>
      <div className="stdPadding">
        <SubmitButton
          allFormsAreValid={allFormsAreValid}
          allValidButAgree={allValidButAgree}
          isSubmittingOrder={isSubmittingOrder}
          submitData={submitData}
          onScreenValidation={onScreenValidation}
        />
      </div>
      {/*<br />
      <br />
      <b style={{ color: 'red' }}>...</b>
      <br />
       <cite>
        Next steps:
        <br />
        1) <s>submit endpoint</s>, validate FE data and process order, on FE
        redirect to succes screen
        <br />
      </cite> */}
      <br />
    </div>
  )
}
export default InputForms
