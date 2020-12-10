import React, { useGlobal } from 'reactn'
import { useTranslation } from 'react-i18next'
import { formatPriceOutput } from 'utils/priceOperations'

const SubmitButton = ({
  allFormsAreValid,
  allValidButAgree,
  isSubmittingOrder,
  submitData,
  onScreenValidation,
}: {
  allFormsAreValid: boolean
  allValidButAgree: boolean
  isSubmittingOrder: boolean
  submitData: () => void
  onScreenValidation: () => void
}) => {
  const [cartInfo] = useGlobal('cartInfo')
  const { t } = useTranslation()
  let submitInfo
  if (allValidButAgree && !allFormsAreValid) {
    submitInfo = t('orderInfo.justAgreeLeft')
  } else if (!allFormsAreValid && !allValidButAgree) {
    submitInfo = t('orderInfo.missingFields')
  } else {
    submitInfo = `${t('orderInfo.sendWithSum')} ${formatPriceOutput(
      cartInfo?.vatIncl?.total
    )} `
    /* [TESTOVACÍ REŽIM] */
  }

  return (
    <div>
      <div className="formSubmit__fieldsLeft">{submitInfo}</div>
      {isSubmittingOrder ? (
        <button className="formSubmit formSubmit--submitting" disabled>
          {t('isSending')}
        </button>
      ) : allFormsAreValid ? (
        <button className="formSubmit formSubmit--ready" onClick={submitData}>
          {t('order')}
        </button>
      ) : (
        <button
          className="formSubmit  formSubmit--notReady"
          onClick={onScreenValidation}
        >
          {t('order')}
        </button>
      )}
      <div style={{ marginTop: '20px' }}>
        KOUPÍ NÁKUPU ZTVRZUJETE, ŽE JSTE SI PŘEČETLI NÁSLEDUJÍCÍ TEXT:
        <p>
          Záleží, co jste si koupili, ale na všechno kromě plakátu je dva roky
          záruka. Na plakát to nedáváme, protože to si ho můžete roztrhnout nebo
          i jinak poškodit (polít, pokydat, ušmudlat) a to není naší chybou,
          tričko si taky můžete roztrhnout i jinak poškodit (polít, pokydat,
          ušmudlat), ale to bude vždycky vaší chybou, takže to ani nereklamujte,
          protože to vám neuznáme. Neuznáme vám taky reklamaci děravých ponožek
          a prošoupaný tašky, s tím nepočítejte.{' '}
        </p>
        <p>
          Magnetky drží na lednici jak přišitý, to na nás taky nezkoušejte a
          placky s ostrou jehlou nevyreklamujeme ze zásady. Ty představují už
          takovou míru rizika, že ručit za to, že se vám s nimi nic nestane, by
          neručila ani pojišťovna. Jako třeba přímo pan Ptáček, který si jehlou
          od placky vyšťoural plombu z bolavého zubu a ten zub se mu pak ulomil
          a teď nemá dvojku vpravo nahoře a všichni, včetně pojišťovny se mu
          smějí, protože byl pojištený pouze na vyražení od lopaty.{' '}
        </p>
        <p>
          Jediný co jsme ochotni vám přijmout k reklamaci, jsou pěkně vymalované
          omalovánky, ty vám vyměníme za nové, pokud je budeme mít na skladě
          ovšem. Taky prosím počítejte s tím, že tím, že jste přistoupili na
          naše podmínky, my jsme přistoupili na vaše, čímž je vše mezi námi
          urovnáno a lze to považovat za vyřízené.
        </p>
      </div>
    </div>
  )
}

export default SubmitButton
