import React, { useDispatch, useState, useEffect } from 'reactn'
import Big from 'big-js'
//import { FunctionComponent } from 'react'

const CartItem = ({ index, item }) => {
  const [amount, setAmount] = useState(item.mnozstvi)
  const changeCartItemAmount = useDispatch('changeCartItemAmount')
  const removeFromCart = useDispatch('removeFromCart')

  useEffect(() => {
    item.mnozstvi !== amount && amount !== '' && setAmount(item.mnozstvi)
  }, [amount, item])

  const changeAmount = (index, newAmount) => {
    if (newAmount > 0) {
      changeCartItemAmount(index, newAmount)
    }
  }
  const inputAmount = e => {
    setAmount(e.target.value)
    if (e.target.value !== '') {
      changeAmount(index, Number(e.target.value))
    }
  }
  const remove = () => {
    removeFromCart(index)
  }
  const sum = item.cena ? Number(new Big(item.cena).times(item.mnozstvi)) : 0

  return (
    <div>
      polozka: {item.nazev}
      <input type="number" value={amount} onChange={inputAmount} />
      <span onClick={() => changeAmount(index, Number(item.mnozstvi) + 1)}>
        +
      </span>
      <span onClick={() => changeAmount(index, Number(item.mnozstvi) - 1)}>
        -
      </span>
      {item.cena} Kč/ks; celkem: {sum} Kč
      <span onClick={remove}> (x) </span>
    </div>
  )
}

export default CartItem
/*const CartItem = ({
  index,
  item,
}: {
  index: number
  item: { nazev: number; mnozstvi: string }
}) => {
  
  //const addItem = useDispatch('addItem')
  const addItem = (index: number) => {
    console.log("additem")
    const fetchCartItems = useDispatch('getCartItems')
  }

  return (
    <div>
      polozka: {item.nazev} - {item.mnozstvi}
      <span onClick={() => addItem(index)}>+</span>
    </div>
  )
}
export default CartItem
 */
