import React, { useGlobal } from 'reactn'
import { useTranslation } from 'react-i18next'
import { OrderCompletedScreen as TypeScreenName } from 'utils/types'
//import { formatPriceOutput } from '../utils/priceOperations'

const OrderCompletedScreen = () => {
  const [screen] = useGlobal('orderCompletedScreenType')
  //const [paymentMethods] = useGlobal('paymentMethods')
  //const [deliveryMethods] = useGlobal('deliveryMethods')
  //const [selectedPayment] = useGlobal('selectedPayment')
  //const [selectedDelivery] = useGlobal('selectedDelivery')
  const [submittedOrderData] = useGlobal('submittedOrderData')
  const { t } = useTranslation()

  const PrintTextFromAPI = () => {
    return (
      <div
        style={{ padding: '25px' }}
        dangerouslySetInnerHTML={{
          __html: submittedOrderData.postOrderInstructions,
        }}
      />
    )
  }
  return (
    <>
      {/* <div>
        {screen === TypeScreenName.BankTransfer && BankTransferScreen()}
      </div>
      <div>{screen === TypeScreenName.PersonalPay && PersonalPayScreen()}</div> */}
      {screen === TypeScreenName.SuccessScreen && PrintTextFromAPI()}
    </>
  )
}

export default OrderCompletedScreen
