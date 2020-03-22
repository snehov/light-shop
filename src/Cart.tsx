import React, { useDispatch, useGlobal, useEffect } from 'reactn'
import CartItem from './components/CartItem'
import { CartItemType } from './utils/types'

const Cart = () => {
  const fetchCart = useDispatch('getCart') //useDispatch().getCartItems//
  const [cartItems] = useGlobal('cartItems') // needs to define at global.d.ts
  const [cartInfo] = useGlobal('cartInfo')

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return (
    <div>
      košík
      <br />
      {cartItems.map((item: CartItemType, index: number) => (
        <CartItem
          index={index}
          item={item}
          key={`${item.product_id}-${item.variant_attr1}-${item.variant_attr2}`}
        />
      ))}
      <hr />
      {cartInfo.vatIncl && (
        <div>
          <div>
            sum: zboží celkem:<b>{cartInfo.vatIncl.goodsSum}</b>
          </div>
          <div>
            dprava: {cartInfo.notes.shipping_note} za{' '}
            {cartInfo.vatIncl.shipping}kč
          </div>
          <div>
            TOTAL: <b>{cartInfo.vatIncl.total}Kč</b>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
