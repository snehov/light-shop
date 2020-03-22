import React, { useDispatch, useState, useEffect } from 'reactn'
import { ft } from '../utils/forceTypes'
import { CartItemType, CartItemTypeObj } from '../utils/types'
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
    <div>
      {item.name}(id:{item.product_id})
      <input type="number" value={amount} onChange={inputAmountChange} />
      <span onClick={() => changeAmountSafe(index, Number(item.amount) + 1)}>
        +
      </span>
      <span onClick={() => changeAmountSafe(index, Number(item.amount) - 1)}>
        -
      </span>
      {item.price} Kč/ks; celkem: {sum} Kč
      <span onClick={() => removeFromCart(index)}> (x) </span>
    </div>
  )
}

type CartItemComponentType = {
  item: CartItemType
  index: number
}

export default CartItem
