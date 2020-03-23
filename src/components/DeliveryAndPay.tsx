import React, { useDispatch, useEffect } from 'reactn'
import DeliveryMethods from './DeliveryMethods'
import PaymentMethods from './PaymentMethods'

const DeliveryAndPay = () => {
  const getDeliveryAndPay = useDispatch('getDeliveryAndPay') //useDispatch().getCartItems//

  useEffect(() => {
    getDeliveryAndPay()
  }, [getDeliveryAndPay])
  return (
    <div className="deliveryAndPay">
      <DeliveryMethods /* default={orderInfo.deliveryMethod || 0}  */ />
      <PaymentMethods /* selectedDelivery={selectedDelivery} *//>
    </div>
  )
}
export default DeliveryAndPay
