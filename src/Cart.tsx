import React, { useDispatch, useGlobal, useEffect } from 'reactn'
import CartItem from './components/CartItem'
import { CartItemType } from './utils/types'

const Cart = () => {
  const fetchCart = useDispatch('getCart') //useDispatch().getCartItems//
  const [cartItems] = useGlobal('cartItems') // needs to define at global.d.ts

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return (
    <div>
      košík
      <br />
      {console.log('cartItems', cartItems)}
      {cartItems.map((item: CartItemType, index: number) => (
        <CartItem
          index={index}
          item={item}
          key={`${item.product_id}-${item.variant_attr1}-${item.variant_attr2}`}
        />
      ))}
    </div>
  )
}

export default Cart
