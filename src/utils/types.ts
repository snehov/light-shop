export const CartItemTypeObj = {
  product_id: 1, //example of typeof; eg. 1 is number, 'a' is string
  variant_attr1: 'a',
  variant_attr2: 'a',
  name: 'a',
  amount: 1,
  price: 1,
}
export type CartItemType = typeof CartItemTypeObj

export const CartTypeObj = {
  noVat: {},
  vatIncl: {},
  vat: {},
  notes: {},
}
export type CartType = typeof CartTypeObj
