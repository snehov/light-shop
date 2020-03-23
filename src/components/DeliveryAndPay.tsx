import React, { useDispatch, useGlobal, useEffect } from 'reactn'
import DeliveryMethodItem from './DeliveryMethodItem'
import { DeliveryMethodType } from 'utils/types'
const isEmpty = require('ramda').isEmpty
//import { formatPriceOutput } from 'utils/priceOperations'

const DeliveryAndPay = () => {
  const getDeliveryAndPay = useDispatch('getDeliveryAndPay') //useDispatch().getCartItems//
  const [deliveryMethods] = useGlobal('deliveryMethods') // needs to define at global.d.ts
  const [paymentMethods] = useGlobal('paymentMethods')

  useEffect(() => {
    getDeliveryAndPay()
  }, [getDeliveryAndPay])

  return (
    <div>
      delivery and pay
      {console.log('deliveryMethods:', deliveryMethods)}
      {console.log('paymentMethods:', paymentMethods)}
      <div>
        <h2>způsoby doručení</h2>
        {!isEmpty(deliveryMethods) &&
          deliveryMethods.map((method: DeliveryMethodType) => (
            <DeliveryMethodItem key={method.delivery_id} method={method} />
          ))}
      </div>
    </div>
  )
}
export default DeliveryAndPay
