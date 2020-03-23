import React, { useDispatch, useState, useGlobal, useEffect } from 'reactn'
import { PaymentMethodType } from 'utils/types'
const isEmpty = require('ramda').isEmpty

const PaymentMethods = (/* { selectedDelivery }: { selectedDelivery: number } */) => {
  const [paymentsMethods] = useGlobal('paymentMethods')
  const [deliveryMethods] = useGlobal('deliveryMethods')
  const [orderInfo] = useGlobal('orderInfo')
  const [paymentMethod, setPaymentMethod] = useState(0)
  const changeDeliveryMethod = useDispatch('changePaymentMethod')
  const [selectedDelivery] = useGlobal('selectedDelivery')
  //const [allowedPayments, setAllowedPayments] = useState([])
  useEffect(() => {
    !isEmpty(orderInfo) && setPaymentMethod(orderInfo.paymentMethod)
  }, [orderInfo])

  const changeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = Number(e.target.value)
    setPaymentMethod(selectedValue)
    changeDeliveryMethod(selectedValue)
  }
  const getAllowedPayments = () => {
    if (selectedDelivery === 0 || isEmpty(deliveryMethods)) {
      return false
    }
    const allowedPayements = deliveryMethods
      .filter(d => d.delivery_id == selectedDelivery)[0] // eslint-disable-line eqeqeq
      .payments.split(',')
    return allowedPayements
  }
  /* const getPaymentIds = () => {
    let ids = []
    //paymentsMethods.forEach(p => ids.push(p.payment_id))
    return "ids"
    //return paymentsMethods.reduce((acc, cur) => [...acc, cur.payment_id], [])
  } */

  console.log(
    'paymentMethod',
    paymentMethod,
    'deliveryMethods',
    deliveryMethods,
    selectedDelivery,
    'parsed>',
    getAllowedPayments(),
  )
  return (
    <div className="paymentChoice">
      <h2>způsoby doručení</h2>
      {!isEmpty(paymentsMethods) &&
        paymentsMethods.map((method: PaymentMethodType) => (
          <div key={method.payment_id}>
            <input
              type="radio"
              name="payment"
              id={`payment_${method.payment_id}`}
              onChange={changeMethod}
              value={method.payment_id}
              checked={method.payment_id == paymentMethod ? true : false} // eslint-disable-line eqeqeq
            />
            <label htmlFor={`payment_${method.payment_id}`}>
              {method.name}({method.payment_id})
            </label>
          </div>
        ))}
    </div>
  )
}
export default PaymentMethods
