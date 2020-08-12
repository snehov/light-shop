import React, { useDispatch, useState, useEffect, useGlobal } from 'reactn'
import { useTranslation } from 'react-i18next'
import { DeliveryMethodType } from 'utils/types'
import { formatPriceOutput } from '../utils/priceOperations'
const isEmpty = require('ramda').isEmpty

const DeliveryMethods = () => {
  const [deliveryMethods] = useGlobal('deliveryMethods')
  const [orderInfo] = useGlobal('orderInfo')
  const [onlyOnlineItems] = useGlobal('onlyOnlineItems')
  const [deliveryMethod, setDeliveryMethod] = useState(0)
  const changeDeliveryMethod = useDispatch('changeDeliveryMethod')
  const { t } = useTranslation()
  useEffect(() => {
    orderInfo?.deliveryMethod && setDeliveryMethod(orderInfo.deliveryMethod)
  }, [orderInfo])

  useEffect(() => {
    changeDeliveryMethod(deliveryMethod)
  }, [deliveryMethod]) // eslint-disable-line

  //# autochange selected delivery when list of allowed changes and is selected currently unsupported choice
  useEffect(() => {
    const allowedDelivery = getAllowedDelivery()
    if (allowedDelivery) {
      if (!allowedDelivery.includes(deliveryMethod)) {
        setDeliveryMethod(0)
      }
    }
  }, [deliveryMethod, deliveryMethods, onlyOnlineItems]) // eslint-disable-line

  const changeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = Number(e.target.value)
    setDeliveryMethod(selectedValue)
  }

  const getAllowedDelivery = () => {
    if (isEmpty(deliveryMethods)) {
      return false
    }
    const allowedDeliveries = onlyOnlineItems
      ? deliveryMethods.filter(d => d.is_online)
      : deliveryMethods.filter(d => !d.is_online)
    return allowedDeliveries.reduce((acc: Array<number>, cur) => {
      return [...acc, cur.delivery_id]
    }, [])
  }

  return (
    <div className="deliveryChoice">
      <h2>
        {
          t('deliveryMethods') // eslint-disable-line
        }
      </h2>
      {!isEmpty(deliveryMethods) &&
        deliveryMethods.map((method: DeliveryMethodType) => {
          const allowedDelivery = getAllowedDelivery()
          const disabled = !method.enabled
            ? true
            : allowedDelivery && !allowedDelivery.includes(method.delivery_id)
          return (
            <div key={method.delivery_id}>
              <label
                htmlFor={`delivery_${method.delivery_id}`}
                className={`inputCont ${disabled ? 'inputCont--disabled' : ''}`}
              >
                {method.name} <b>{formatPriceOutput(method.price)}</b> (id:
                {method.delivery_id})
                <input
                  type="radio"
                  name="delivery"
                  id={`delivery_${method.delivery_id}`}
                  onChange={changeMethod}
                  value={method.delivery_id}
                  checked={method.delivery_id == deliveryMethod ? true : false} // eslint-disable-line eqeqeq
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
export default DeliveryMethods
