import React, { useGlobal } from 'reactn'
import CartItem from './components/CartItem'
import { CartItemType } from './utils/types'
import { formatPriceOutput } from 'utils/priceOperations'

const Cart = () => {
  const [cartItems] = useGlobal('cartItems') // needs to define at global.d.ts
  const [cartInfo] = useGlobal('cartInfo')

  return cartItems.length === 0 ? (
    <div>košík je prázdný</div>
  ) : (
    <div className="cart">
      košík
      <br />
      {cartItems.map((item: CartItemType, index: number) => (
        <CartItem
          index={index}
          item={item}
          key={`${item.product_id}-${item.variant_attr1}-${item.variant_attr2}`}
        />
      ))}
      {cartInfo.vatIncl && cartInfo.vatIncl.shipping > 0 && (
        <div className="cart-item cart-extraItem">
          <div className="cart-extraItem--name">
            dprava: {cartInfo.notes.shipping_note}
          </div>
          <div className="cart-extraItem--price">
            {formatPriceOutput(cartInfo.vatIncl.shipping)}
          </div>
        </div>
      )}
      {cartInfo.vatIncl && cartInfo.vatIncl.paymentFee > 0 && (
        <div className="cart-item cart-extraItem">
          <div className="cart-extraItem--name">
            platba: {cartInfo.notes.paymentFee_note}
          </div>
          <div className="cart-extraItem--price">
            {formatPriceOutput(cartInfo.vatIncl.paymentFee)}
          </div>
        </div>
      )}
      {/* cartInfo.vatIncl && (
        <div className="cart-item cart-extraItem">
          <div className="cart-extraItem--name">
            sleva: {cartInfo.notes.shipping_note}
          </div>
          <div className="cart-extraItem--price">
            {cartInfo.vatIncl.shipping}kč
          </div>
        </div>
      ) */}
      {cartInfo.vatIncl && (
        <div className="cart-sum">
          <div className="cart-sum--sumWord">cena celkem</div>

          <div>
            <b>{formatPriceOutput(cartInfo.vatIncl.total)}</b>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
