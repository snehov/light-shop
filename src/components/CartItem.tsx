import React, { useDispatch, useState, useEffect } from 'reactn'
import { ft } from '../utils/forceTypes'
import { CartItemType, CartItemTypeObj } from '../utils/types'
import { formatPriceOutput } from '../utils/priceOperations'
const Big = require('big-js')

const CartItem = (params: CartItemComponentType) => {
  const item = ft(params.item, CartItemTypeObj),
    index = ft(params.index, 1)

  const [amount, setAmount] = useState(item.amount)
  const changeAmount = useDispatch().changeCartItemAmount
  const removeFromCart = useDispatch().removeFromCart
  useEffect(() => {
    item.amount !== amount && amount !== '' && setAmount(item.amount)
  }, [amount, item])

  const changeAmountSafe = (index: number, newAmount: number) => {
    if (newAmount > 0) {
      changeAmount(index, newAmount)
    }
  }

  const inputAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    if (e.target.value !== '') {
      changeAmountSafe(index, Number(e.target.value))
    }
  }

  const sum = item.price ? Number(new Big(item.price).times(item.amount)) : 0

  return (
    <div className="cart-item">
      <div className="cart-item--name">
        {item.link ? <a href={item.link}>{item.name}</a> : item.name}
        {/* (id:{item.product_id}) */}
      </div>
      <div className="cart-item--amount">
        {!item.is_one_piece && (
          <input
            className="cart-item--amount__input"
            type="number"
            value={amount}
            onChange={inputAmountChange}
          />
        )}
        <div className="vertical horizontal-sm">
          {!item.is_one_piece && (
            <>
              <button
                className="cart-item--amount__plus cart-item--amount__button"
                onClick={() => changeAmountSafe(index, Number(item.amount) + 1)}
              >
                +
              </button>
              <button
                className="cart-item--amount__minus  cart-item--amount__button"
                onClick={() => changeAmountSafe(index, Number(item.amount) - 1)}
              >
                -
              </button>
            </>
          )}
        </div>
      </div>
      <div className="cart-item--price"></div>
      <div className="cart-item--price__piece">
        {formatPriceOutput(item.price)}
        {!item.is_one_piece && '/ks'}
      </div>
      <div className="cart-item--price__sum"> {formatPriceOutput(sum)}</div>
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

type CartItemComponentType = {
  item: CartItemType
  index: number
}

export default CartItem
