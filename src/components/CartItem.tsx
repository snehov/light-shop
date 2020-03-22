import React, { useDispatch, useState, useEffect } from 'reactn'
import { ft } from '../utils/forceTypes'
const Big = require('big-js')

const CartItem = (params: CartItemType) => {
  const item = ft(params.item, CartItemTypeObj.item),
    index = ft(params.index, CartItemTypeObj.index)

  const [amount, setAmount] = useState(item.mnozstvi)
  const changeAmount = useDispatch().changeCartItemAmount
  const removeFromCart = useDispatch().removeFromCart
  useEffect(() => {
    item.mnozstvi !== amount && amount !== '' && setAmount(item.mnozstvi)
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

  const sum = item.cena ? Number(new Big(item.cena).times(item.mnozstvi)) : 0

  return (
    <div>
      {item.nazev}
      <input type="number" value={amount} onChange={inputAmountChange} />
      <span onClick={() => changeAmountSafe(index, Number(item.mnozstvi) + 1)}>
        +
      </span>
      <span onClick={() => changeAmountSafe(index, Number(item.mnozstvi) - 1)}>
        -
      </span>
      {item.cena} Kč/ks; celkem: {sum} Kč
      <span onClick={() => removeFromCart(index)}> (x) </span>
    </div>
  )
}

/* type CartItemType ={
  item: {
    nazev: number
    mnozstvi: string
    cena: number
  }
  index: number
} */
const CartItemTypeObj = {
  item: {
    nazev: 'a', //example of typeof; eg. 1 is number, 'a' is string
    mnozstvi: 1,
    cena: 1,
  },
  index: 1,
}
type CartItemType = typeof CartItemTypeObj

export default CartItem
