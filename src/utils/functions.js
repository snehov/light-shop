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

export const getEnv = () => {
  const searchParts = window.location.search.substr(1).split('&')
  const searchObj = searchParts.reduce((acc, cur) => {
    const sp = cur.split('=')
    return { ...acc, [sp[0]]: sp[1] }
  }, {})
  const urlEnv = searchObj?.env || false
  const env = urlEnv || process.env.NODE_ENV
  return env
}
