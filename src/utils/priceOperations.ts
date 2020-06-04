export const formatPriceOutput = (
  price: number,
  currencyPrefix = '',
  currencyPostfix = ' Kč',
) => {
  let output = currencyPrefix
  if (price) {
    const fPrice = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    if (fPrice !== '0') {
      const split = fPrice.split('.')
      if (split.length === 2) {
        output += fPrice.split('.')[1].length === 1 ? `${fPrice}0` : fPrice //desetníky
      } else {
        output += fPrice
      }
    } else {
      output += '0'
    }
  } else {
    output += '0'
  }
  output += currencyPostfix
  return output
}
