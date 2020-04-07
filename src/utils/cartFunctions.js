export const parseSimpleCartList = (cartItems) => {
  return cartItems.reduce(
    (acc, cur) => [
      ...acc,
      {
        id: cur.product_id,
        amount: cur.amount,
        v1: cur.variant_attr1,
        v2: cur.variant_attr2,
      },
    ],
    [],
  )
}
