import React, { useDispatch, useGlobal, useState } from 'reactn'
import { CartItemType } from 'utils/types'

export const useGetProduct = (product_id: number): CartItemType | null => {
  const [products] = useGlobal('products')
  const [isSearchning, setIsSearching] = useState(false)
  const fetchProduct = useDispatch('fetchProduct')
  let pdctRes = null
  const productSearch = Array.isArray(products)
    ? products.filter(f => f.product_id === product_id)
    : []

  if (productSearch.length > 0) {
    pdctRes = productSearch[0]
  } else {
    if (!isSearchning) {
      setIsSearching(true)
      fetchProduct(product_id)
    }
  }

  return pdctRes
}
