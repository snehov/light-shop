import React from 'react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <div>
      <div className="formSubmit__fieldsLeft">
        {allValidButAgree && !allFormsAreValid && t('orderInfo.justAgreeLeft')}
        {!allFormsAreValid && !allValidButAgree && t('orderInfo.missingFields')}
      </div>
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
