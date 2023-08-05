import React, { useDispatch } from 'reactn'
import { formatPriceOutput } from 'utils/priceOperations'
import { SalesType } from 'utils/types'

interface SalesItemType extends SalesType {
  index: number
}

export const SalesItem = ({ percent, prize, descr, index }: SalesItemType) => {
  const removeSaleItem = useDispatch('removeSaleItem')
  const removeFromCart = (index: number) => {
    removeSaleItem(index)
  }
  return (
    <div className="cart-item cart-item-sale">
      <span className="cart-item-sale--name">{descr}</span>
      <span className="cart-item--price__sum">
        {' - '}
        {percent > 0 ? `${percent * 100} %` : formatPriceOutput(prize)}
      </span>
      <div className="cart-item--del">
        <button
          className="cart-item--del__button"
          onClick={() => removeFromCart(index)}
        >
          x
        </button>
      </div>
    </div>
  )
}
