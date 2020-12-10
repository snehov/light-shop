import React, { useGlobal } from 'reactn'
import { useTranslation } from 'react-i18next'
import { OrderCompletedScreen as TypeScreenName } from 'utils/types'
import { formatPriceOutput } from '../utils/priceOperations'

const OrderCompletedScreen = () => {
  const [screen] = useGlobal('orderCompletedScreenType')
  const [paymentMethods] = useGlobal('paymentMethods')
  const [deliveryMethods] = useGlobal('deliveryMethods')
  const [selectedPayment] = useGlobal('selectedPayment')
  const [selectedDelivery] = useGlobal('selectedDelivery')
  const [submittedOrderData] = useGlobal('submittedOrderData')
  const { t } = useTranslation()

  /* const SuccessHeader = () => {
    return (
      <>
        <b className="objednanoDekujeme">
          Děkujeme za podporu hladovějících pohádkových bytostí. Z vašich peněz
          jim nakoupíme 4 kg brambor a 15 kg řepy, což jim vystačí na celý
          týden. Přijďte zase brzy!
        </b>
        <p>Kontaktní číslo objednávky: {submittedOrderData.newOrderNumber}</p>
        <p>Emil již vyrazil pro zboží do skladu, Andulka ho bude balit.</p>
      </>
    )
  } */

  /* const DescribeDelivery = (payScreen: TypeScreenName) => {
    const delivery = deliveryMethods.filter(
      f => f.delivery_id === selectedDelivery
    )[0]

    return (
      <>
        {payScreen === TypeScreenName.BankTransfer && (
          <>
            {delivery.personal_pickup && (
              <p>
                Jakmile uhradíte částku na náš účet, ozveme se Vám telefonicky a
                domluvíme čas a místo předání v Českém Krumlově nebo Českých
                Budějovicích.
              </p>
            )}
            {delivery.require_address && !delivery.personal_pickup && (
              <p>
                Jakmile uhradíte částku na náš účet, Karkulka ho v košíčku
                donese přes les na poštu. Pošťák Ludva už pak vše vyřídí a
                balíček dorazí brzy k Vám.
              </p>
            )}
          </>
        )}
        {payScreen === TypeScreenName.PersonalPay && (
          <>
            {delivery.personal_pickup && (
              <>
                <p>
                  Ozveme se Vám telefonicky a domluvíme čas a místo předání
                  v Českém Krumlově nebo Českých Budějovicích. Zboží zaplatíte
                  na ruku až při osobním předání.
                </p>
                {<p dangerouslySetInnerHTML={{ __html: delivery.description }} /> }
              </>
            )}
          </>
        )}
        {delivery.is_online && (
          <>
            <h2>Informace k online doručení </h2>
            <br />
            <p dangerouslySetInnerHTML={{ __html: delivery.description }} />
          </>
        )}
      </>
    )
  } */

  /* const PersonalPayScreen = () => {

    return (
      <>
        {SuccessHeader()}
        <p>{DescribeDelivery(TypeScreenName.PersonalPay)}</p>
        {<p>Objednávku zaplatíte až při převzetí</p>}
        {<p dangerouslySetInnerHTML={{ __html: delivery.description }} />}
        <p>
          V případě dotazů nás kontaktujte na:{' '}
          <a href="mailto:esamoska@pohadkovarezervace.cz">
            esamoska@pohadkovarezervace.cz
          </a>
        </p>
      </>
    )
  } */

  /* const BankTransferScreen = () => {
    const payment = paymentMethods.filter(
      f => f.payment_id === selectedPayment
    )[0]

    const accountNumber = payment.account
    return (
      <>
        {SuccessHeader()}
        <p>{DescribeDelivery(TypeScreenName.BankTransfer)}</p>
        <p>
          V případě dotazů nás kontaktujte na:{' '}
          <a href="mailto:esamoska@pohadkovarezervace.cz">
            esamoska@pohadkovarezervace.cz
          </a>
        </p>
        <h2>Údaje k platbě</h2>
        <div>Číslo účtu {accountNumber}</div>
        <div>Variabilní symbol: {submittedOrderData.newOrderNumber} </div>
        <div>
          Cena:{' '}
          {formatPriceOutput(submittedOrderData.orderData?.cena_objednavky)}
        </div>
      </>
    )
  } */
  const PrintTextFromAPI = () => {
    return (
      <div
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
