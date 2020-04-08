import React, { useDispatch, useState, useEffect, useGlobal } from 'reactn'
import { useTranslation } from 'react-i18next'
import { DeliveryMethodType } from 'utils/types'
import { formatPriceOutput } from '../utils/priceOperations'
const isEmpty = require('ramda').isEmpty

const DeliveryMethods = () => {
  const [deliveryMethods] = useGlobal('deliveryMethods')
  const [orderInfo] = useGlobal('orderInfo')
  const [deliveryMethod, setDeliveryMethod] = useState(0)
  const changeDeliveryMethod = useDispatch('changeDeliveryMethod')
  const { t } = useTranslation()
  useEffect(() => {
    orderInfo?.deliveryMethod && setDeliveryMethod(orderInfo.deliveryMethod)
  }, [orderInfo])

  const changeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = Number(e.target.value)
    console.log('selectedValue', selectedValue)
    setDeliveryMethod(selectedValue)
    changeDeliveryMethod(selectedValue)
  }

  return (
    <div className="deliveryChoice">
      <h2>
        {
          t('deliveryMethods') // eslint-disable-line
        }
      </h2>
      {!isEmpty(deliveryMethods) &&
        deliveryMethods.map((method: DeliveryMethodType) => (
          <div key={method.delivery_id}>
            <label
              htmlFor={`delivery_${method.delivery_id}`}
              className="inputCont"
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
              />
              <span className="radiobtn"></span>
            </label>
          </div>
        ))}
    </div>
  )
}
export default DeliveryMethods
