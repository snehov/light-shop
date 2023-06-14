import React, { useDispatch, useGlobal } from 'reactn'
import { CodeInput } from './ui-components/CodeInput'

const resStatus = [
  'Voucher není platný',
  'Voucher byl přidán',
  'Vouchery nelze kombinovat',
  'Přidání se nezdařilo',
]

export const Voucher = () => {
  const sendVoucher = useDispatch('submitVoucherCode')
  const [{ pending, response }] = useGlobal('voucherSubmit')
  const handleSubmit = (code: string) => {
    sendVoucher(code)
  }

  return (
    <div className="cart-voucher">
      <span className="cart-voucher-label">Mám slevový kód:</span>
      <span className="cart-voucher-input-wrap">
        <CodeInput
          maxLength={20}
          submit={handleSubmit}
          isProcessing={pending}
        />
        <span className="cart-voucher-response">{resStatus[response]}</span>
      </span>
    </div>
  )
}
