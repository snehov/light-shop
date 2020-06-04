import React, { useGlobal } from 'reactn'
import { useTranslation } from 'react-i18next'
import CartItem from './components/CartItem'
import { CartItemType } from './utils/types'
import { formatPriceOutput } from 'utils/priceOperations'

const Cart = () => {
  const [cartItems] = useGlobal('cartItems') // needs to define at global.d.ts
  const [cartInfo] = useGlobal('cartInfo')
  const { t } = useTranslation()

  return cartItems.length === 0 ? (
    <div className="cart__header cart__header--empty">{t('cartEmpty')}</div>
  ) : (
    <div className="cart">
      <div className="cart__header">{t('cart')}</div>
      {cartItems.map((item: CartItemType, index: number) => (
        <CartItem
          index={index}
          item={item}
          key={`${item.product_id}-${item.variant_attr1}-${item.variant_attr2}`}
        />
      ))}
      <div
        className={`cart-item cart-extraItem cy-cart-delivery ${
          cartInfo.vatIncl && cartInfo.vatIncl.shipping > 0
            ? 'cart-extraItem--visible'
            : 'cart-extraItem--hidden'
        }`}
      >
        <div className="cart-extraItem--name">
          {t('delivery')}: {cartInfo.notes.shipping_note}
        </div>
        <div className="cart-extraItem--price">
          {formatPriceOutput(cartInfo.vatIncl.shipping)}
        </div>
      </div>
      <div
        className={`cart-item cart-extraItem cy-cart-payment ${
          cartInfo.vatIncl && cartInfo.vatIncl.paymentFee > 0
            ? 'cart-extraItem--visible'
            : 'cart-extraItem--hidden'
        }`}
      >
        <div className="cart-extraItem--name">
          {t('payment')}: {cartInfo.notes.paymentFee_note}
        </div>
        <div className="cart-extraItem--price">
          {formatPriceOutput(cartInfo.vatIncl.paymentFee)}
        </div>
      </div>
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
          <div className="cart-sum--sumWord">{t('totalPrice')}</div>

          <div>
            <b className="cart-sum__TOTAL">
              {formatPriceOutput(cartInfo.vatIncl.total)}
            </b>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
