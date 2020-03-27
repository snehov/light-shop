import React, { useDispatch, useState, useEffect, useGlobal } from 'reactn'
import { DeliveryMethodType } from 'utils/types'
const isEmpty = require('ramda').isEmpty

const DeliveryMethods = () => {
  const [deliveryMethods] = useGlobal('deliveryMethods')
  const [orderInfo] = useGlobal('orderInfo')
  const [deliveryMethod, setDeliveryMethod] = useState(0)
  const changeDeliveryMethod = useDispatch('changeDeliveryMethod')
  useEffect(() => {
    !isEmpty(orderInfo) && setDeliveryMethod(orderInfo.deliveryMethod)
  }, [orderInfo])

  const changeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = Number(e.target.value)
    setDeliveryMethod(selectedValue)
    changeDeliveryMethod(selectedValue)
  }

  return (
    <div className="deliveryChoice">
      <h2>způsoby doručení</h2>
      {!isEmpty(deliveryMethods) &&
        deliveryMethods.map((method: DeliveryMethodType) => (
          <div key={method.delivery_id}>
            <input
              type="radio"
              name="delivery"
              id={`delivery_${method.delivery_id}`}
              onChange={changeMethod}
              value={method.delivery_id}
              checked={method.delivery_id == deliveryMethod ? true : false} // eslint-disable-line eqeqeq
            />
            <label htmlFor={`delivery_${method.delivery_id}`}>
              {method.name}({method.delivery_id})
            </label>
          </div>
        ))}
    </div>
  )
}
export default DeliveryMethods