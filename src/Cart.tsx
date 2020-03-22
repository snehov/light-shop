import React, { useDispatch, useGlobal, useEffect } from 'reactn'
import CartItem from './components/CartItem'
import { CartItemType } from './utils/types'

const Cart = () => {
  const fetchCartItems = useDispatch().getCartItems
  const [cartItems] = useGlobal('cartItems') // needs to define at global.d.ts

  useEffect(() => {
    fetchCartItems()
  }, [fetchCartItems])

  return (
    <div>
      košík
      <br />
      {cartItems.map((item: CartItemType, index: number) => (
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
