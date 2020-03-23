import React, { useDispatch, useState, useEffect } from 'reactn'
import { DeliveryMethodType } from 'utils/types'

const DeliveryMethodItem = ({ method }: { method: DeliveryMethodType }) => {
  //const [deliveryMethod, setDeliveryMethod] = useState(0)
  const changeDeliveryMethod = useDispatch('changeDeliveryMethod')
  /* useEffect(() => {
    changeDeliveryMethod(deliveryMethod)
  }, [changeDeliveryMethod, deliveryMethod]) */

  const changeDelivery = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log('change e', e.target.value)
    //setDeliveryMethod(Number(e.target.value))
    changeDeliveryMethod(Number(e.target.value))
  }
  return (
    <div>
      <input
        type="radio"
        name="delivery"
        id={`delivery_${method.delivery_id}`}
        onChange={changeDelivery}
        value={method.delivery_id}
      />
      <label htmlFor={`delivery_${method.delivery_id}`}>
        {method.name}({method.delivery_id})
      </label>
    </div>
  )
}
export default DeliveryMethodItem
