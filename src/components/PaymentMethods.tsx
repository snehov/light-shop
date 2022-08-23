import React, { useDispatch, useState, useGlobal, useEffect } from 'reactn'
import { useTranslation } from 'react-i18next'
import { PaymentMethodType } from 'utils/types'
import { formatPriceOutput } from '../utils/priceOperations'
const isEmpty = require('ramda').isEmpty
const isNil = require('ramda').isNil
const intersection = require('ramda').intersection

const PaymentMethods = () => {
  const [paymentsMethods] = useGlobal('paymentMethods')
  const [deliveryMethods] = useGlobal('deliveryMethods')
  const [orderInfo] = useGlobal('orderInfo')
  const [paymentMethod, setPaymentMethod] = useState(0)
  const [selectedDelivery] = useGlobal('selectedDelivery')
  const changePaymentMethod = useDispatch('changePaymentMethod')
  const { t } = useTranslation()

  useEffect(() => {
    orderInfo?.paymentMethod && setPaymentMethod(orderInfo.paymentMethod) //# preselect historicaly chosen option (used with page refresh)
  }, [orderInfo])

  useEffect(() => {
    changePaymentMethod(paymentMethod)
  }, [paymentMethod]) // eslint-disable-line

  useEffect(() => {
    //# when delivery methods loaded
    if (
      paymentMethod !== 0 &&
      !isNil(paymentMethod) &&
      deliveryMethods !== []
    ) {
      const allowedPayments = getAllowedPayments()
      console.log('paymentMethod', paymentMethod)
      //# if delivery changes and current payment is not supported by that delivery, change to fist in list of suppored
      console.log(
        'allowedPayments',
        allowedPayments, // [] when error
        'deliveryMethods',
        deliveryMethods
      )
      //TODO: check for errors after one order done, new order start
      if (!allowedPayments.includes(paymentMethod.toString())) {
        allowedPayments.length > 0
          ? setPaymentMethod(Number(allowedPayments[0]))
          : setPaymentMethod(allowedPayments[0])
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

    const currentPayments = paymentsMethods.reduce((acc: any, cur) => {
      return [...acc, cur.payment_id.toString()] // TODO: I dont like this "toSting()", make allowedPayements result as integers
    }, [])

    const allowedPresent = intersection(allowedPayements, currentPayments)
    return allowedPresent
  }

  return (
    <div className="paymentChoice">
      <h2>{t('paymentMethods')}</h2>
      {!isEmpty(paymentsMethods) &&
        paymentsMethods.map((method: PaymentMethodType) => {
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
                {method.name} <b>{formatPriceOutput(method.price)}</b>
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
