import { formatPriceOutput } from './priceOperations'

test('Test price with thousands', () => {
  const price = formatPriceOutput(1200)
  expect(price).toMatchInlineSnapshot(`"1 200 Kč"`)
})
test('Test price in foreign currency', () => {
  const price = formatPriceOutput(24.23, '€', '')
  expect(price).toMatchInlineSnapshot(`"€24.23"`)
})
