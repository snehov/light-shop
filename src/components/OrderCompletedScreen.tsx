import React, { useGlobal } from 'reactn'
import { useTranslation } from 'react-i18next'
import { OrderCompletedScreen as TypeScreenName } from 'utils/types'

const OrderCompletedScreen = () => {
  const [screen] = useGlobal('orderCompletedScreenType')
  const [submittedOrderData] = useGlobal('submittedOrderData')
  const [paymentResult] = useGlobal('paymentResult')
  const [submittedOrderId] = useGlobal('submittedOrderId')

  const { t } = useTranslation()

  const PrintTextFromAPI = () => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: submittedOrderData.postOrderInstructions,
        }}
      />
    )
  }
  const ShowPaymentResult = () => {
    return !paymentResult ? (
      <div>{t('orderComplete.loadingPaymentData')}</div>
    ) : (
      <>
        {paymentResult.error ? (
          <div>{t('orderComplete.orderNotFound')}</div>
        ) : (
          <div>
            <h3>
              {t('orderComplete.orderPayment')}: {submittedOrderId}
            </h3>
            {paymentResult.status === 'PENDING' && (
              <div>{t('orderComplete.paymentPending')}</div>
            )}
            {paymentResult.status === 'PAID' && (
              <div>{t('orderComplete.paymentPaid')}</div>
            )}
            {paymentResult.status === 'CANCELLED' && (
              <div>{t('orderComplete.paymentCanceled')}</div>
            )}
          </div>
        )}
      </>
    )
  }
  return (
    <>
      {screen === TypeScreenName.SuccessScreen && PrintTextFromAPI()}
      {screen === TypeScreenName.PaymentResult && ShowPaymentResult()}
    </>
  )
}

export default OrderCompletedScreen
