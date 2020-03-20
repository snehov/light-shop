import React, { useDispatch, useGlobal, useState } from 'reactn'
import CartItem from './components/CartItem'

const Cart = () => {
  const [cartItems] = useGlobal('cartItems')
  const fetchCartItems = useDispatch('getCartItems')

  useState(() => {
    fetchCartItems()
  }, [])

  return (
    <div>
      košík
      <br />
      {cartItems.map(item => (
        <CartItem
          item={item}
          key={`${item.idProdukt}-${item.variace}-${item.variace2}`}
        />
      ))}
    </div>
  )
}
export default Cart
