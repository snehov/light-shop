import React, { useDispatch, useGlobal, useState, useEffect } from 'reactn'
//import { FunctionComponent } from 'react'
import CartItem from './components/CartItem.tsx'

const Cart = () => {
  //const Cart: FunctionComponent = () => {
  const [cartItems] = useGlobal('cartItems')
  const fetchCartItems = useDispatch('getCartItems')

  useEffect(() => {
    fetchCartItems()
  }, [fetchCartItems])

  return (
    <div>
      košík
      <br />
      {cartItems.map((item, index) => (
        <CartItem
          index={index}
          item={item}
          key={`${item.idProdukt}-${item.variace}-${item.variace2}`}
        />
      ))}
    </div>
  )
}
export default Cart
