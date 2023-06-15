import React, { useDispatch, useState, useGlobal, useEffect } from 'reactn'
import { useTranslation } from 'react-i18next'
import { PaymentMethodType } from 'utils/types'
import { formatPriceOutput } from '../utils/priceOperations'
import { filterPayMethods } from './payMethodsConditions'
const isEmpty = require('ramda').isEmpty
const intersection = require('ramda').intersection

const PaymentMethods = () => {
  const [paymentsMethods] = useGlobal('paymentMethods')
  const [paymentsFiltered, setPaymentsFiltered] = useState(paymentsMethods)
  const [cartItems] = useGlobal('cartItems')
  const [cartInfo] = useGlobal('cartInfo')
  const [deliveryMethods] = useGlobal('deliveryMethods')
  const [orderInfo] = useGlobal('orderInfo')
  const [paymentMethod, setPaymentMethod] = useState(0)
  const [selectedDelivery] = useGlobal('selectedDelivery')
  const changePaymentMethod = useDispatch('changePaymentMethod')
  const { t } = useTranslation()
  useEffect(() => {
    setPaymentsFiltered(
      filterPayMethods(cartItems, paymentsMethods, selectedDelivery)
    )
  }, [cartInfo, cartItems, paymentsMethods, selectedDelivery])
  useEffect(() => {
    orderInfo?.paymentMethod && setPaymentMethod(orderInfo.paymentMethod) //# preselect historicaly chosen option (used with page refresh)
  }, [orderInfo])

  useEffect(() => {
    changePaymentMethod(paymentMethod)
  }, [paymentMethod]) // eslint-disable-line

  useEffect(() => {
    if (paymentsFiltered.length === 1 && paymentMethod == 0) {
      setPaymentMethod(paymentsFiltered[0].payment_id)
    }
  }, [paymentsFiltered, paymentMethod])

  useEffect(() => {
    //# when delivery methods loaded
    if (paymentMethod !== 0 && deliveryMethods.length > 0) {
      const allowedPayments = getAllowedPayments()
      //console.log('paymentMethod', paymentMethod)
      //# if delivery changes and current payment is not supported by that delivery, change to fist in list of suppored
      //console.log('allowedPayments',allowedPayments,'deliveryMethods',deliveryMethods)
      if (!allowedPayments.includes(paymentMethod.toString())) {
        console.log('setuju platbu>>>>')
        allowedPayments.length > 0
          ? setPaymentMethod(Number(allowedPayments[0]))
          : setPaymentMethod(0)
      }
    }
  }, [selectedDelivery]) // eslint-disable-line

  const changeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = Number(e.target.value)
    setPaymentMethod(selectedValue)
  }
  const getAllowedPayments = () => {
    if (selectedDelivery === 0 || isEmpty(deliveryMethods)) {
      return []
    }
    const allowedPayements = !selectedDelivery
      ? ''
      : deliveryMethods
          .filter(d => d.delivery_id == selectedDelivery)[0] //eslint-disable-line eqeqeq
          .payments.split(',')

    const currentPayments = paymentsFiltered.reduce((acc: any, cur) => {
      return [...acc, cur.payment_id.toString()] // TODO: I dont like this "toSting()", make allowedPayements result as integers
    }, [])
    const allowedPresent = intersection(allowedPayements, currentPayments)
    return allowedPresent
  }
  return (
    <div className="paymentChoice">
      <h2>{t('paymentMethods')}</h2>
      {!isEmpty(paymentsFiltered) &&
        paymentsFiltered.map((method: PaymentMethodType) => {
          const disabled = isEmpty(getAllowedPayments())
            ? false
            : !method.enabled
            ? true
            : !getAllowedPayments().includes(method.payment_id.toString())
          return (
            <div key={method.payment_id}>
              <label
                htmlFor={`payment_${method.payment_id}`}
                className={`inputCont ${disabled ? 'inputCont--disabled' : ''}`}
              >
                {method.name}
                {method.price > 0 ? (
                  <b> {formatPriceOutput(method.price)}</b>
                ) : null}
                {/* (id:{method.payment_id}) */}
                <input
                  type="radio"
                  name="payment"
                  id={`payment_${method.payment_id}`}
                  onChange={changeMethod}
                  value={method.payment_id}
                  checked={method.payment_id == paymentMethod ? true : false} // eslint-disable-line eqeqeq
                  disabled={disabled}
                />
                <span className="radiobtn"></span>
              </label>
            </div>
          )
        })}
    </div>
  )
}
export default PaymentMethods
