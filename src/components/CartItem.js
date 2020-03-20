import React from 'react'

const CartItem = ({ item }) => {
  return (
    <div>
      polozka: {item.nazev} - {item.mnozstvi}
    </div>
  )
}
export default CartItem
