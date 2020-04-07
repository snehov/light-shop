import React, { useDispatch, useEffect } from 'reactn'
import DeliveryMethods from './DeliveryMethods'
import PaymentMethods from './PaymentMethods'

const DeliveryAndPay = ({ disabled }: { disabled?: boolean }) => {
  const getDeliveryAndPay = useDispatch('getDeliveryAndPay') //useDispatch().getCartItems//

  useEffect(() => {
    getDeliveryAndPay()
  }, [getDeliveryAndPay])
  return (
    <div
      className={disabled ? 'deliveryAndPay disabledBlock' : 'deliveryAndPay'}
    >
      {disabled && (
        <div
          className="disabledBlock__message"
          title="Košík musí obsahovat zboží"
        >
          Košík musí obsahovat zboží
        </div>
      )}
      <DeliveryMethods />
      <PaymentMethods />
    </div>
  )
}
export default DeliveryAndPay
