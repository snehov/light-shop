import React, { useState, KeyboardEvent, Fragment } from 'react'

interface VoucherCodeProps {
  maxLength: number
  submit: (code: string) => void
  isProcessing: boolean
}
export const CodeInput = ({
  maxLength,
  submit,
  isProcessing,
}: VoucherCodeProps) => {
  const [code, setCode] = useState<string>('')

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitCode()
    }
  }
  const submitCode = () => {
    submit(code)
    setCode('')
  }

  return (
    <Fragment>
      <input
        maxLength={maxLength}
        type="text"
        className="cart-voucher-input"
        value={code}
        onKeyPress={handleKeyPress}
        onChange={e => setCode(e.target.value)}
        disabled={isProcessing}
      />
      <button
        className="cart-voucher-submit"
        onClick={submitCode}
        disabled={isProcessing}
      >
        Uplatnit
      </button>
    </Fragment>
  )
}
