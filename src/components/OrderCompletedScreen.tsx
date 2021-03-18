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
      <div>Stahuji data o platbě</div>
    ) : (
      <>
        {paymentResult.error ? (
          <div>Objednávka nebyla nalezena</div>
        ) : (
          <div>
            <h3>Platba objednávky: {submittedOrderId}</h3>
            {paymentResult.status === 'PENDING' && (
              <div>Platba je ve stavu: čeká na zaplacení</div>
            )}
            {paymentResult.status === 'PAID' && (
              <div>Objednávka byla úspěšně zaplacena</div>
            )}
            {paymentResult.status === 'CANCELLED' && (
              <div>Platba byla zrušena ze strany uživatele</div>
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
