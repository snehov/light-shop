import React, { useDispatch, useEffect } from 'reactn'
import DeliveryMethods from './DeliveryMethods'
import PaymentMethods from './PaymentMethods'
import { useTranslation } from 'react-i18next'

const DeliveryAndPay = ({ disabled }: { disabled?: boolean }) => {
  const getDeliveryAndPay = useDispatch('getDeliveryAndPay') //useDispatch().getCartItems
  const { t } = useTranslation()
  useEffect(() => {
    getDeliveryAndPay()
  }, [getDeliveryAndPay])
  return (
    <div
      className={disabled ? 'deliveryAndPay disabledBlock' : 'deliveryAndPay'}
    >
      {disabled && (
        <div className="disabledBlock__message" title={t('cartNeedItems')}>
          {t('cartNeedItems')}{' '}
        </div>
      )}
      <DeliveryMethods />
      <PaymentMethods />
    </div>
  )
}
export default DeliveryAndPay
