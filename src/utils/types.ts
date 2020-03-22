export const CartItemTypeObj = {
  idProdukt: 1, //example of typeof; eg. 1 is number, 'a' is string
  variace: 'a',
  variace2: 'a',
  nazev: 'a',
  mnozstvi: 1,
  cena: 1,
}
export type CartItemType = typeof CartItemTypeObj
