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
    submitInfo = `${t('orderInfo.sendWithSum')} ${formatPriceOutput(cartInfo?.vatIncl?.total)} [TESTOVACÍ REŽIM]`
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
    </div>
  )
}

export default SubmitButton
