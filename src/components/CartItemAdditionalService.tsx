import { useEffect } from 'react'
import React, { useDispatch, useGlobal, useState } from 'reactn'
import { useGetProduct } from 'reducers/ProductsProvider'
import { formatPriceOutput } from 'utils/priceOperations'

interface CartItemAdditionalServiceProps {
  services: Array<number>
}
export const CartItemAdditionalService = ({
  services,
}: CartItemAdditionalServiceProps) => {
  return (
    <div>
      <div className="recomendAdd">
        Doporučujeme přidat navíc ještě tyto služby:
      </div>
      {services.map(service => (
        <AdditionalService serviceId={service} key={service} />
      ))}
    </div>
  )
}

interface AdditionalServiceProps {
  serviceId: number
}
const AdditionalService = ({ serviceId }: AdditionalServiceProps) => {
  const [cartItems] = useGlobal('cartItems')
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useDispatch('addItem')
  const product = useGetProduct(serviceId)
  const isServiceAdded = cartItems.find(i => i.product_id === serviceId)

  useEffect(() => {
    if (isServiceAdded) {
      setIsAdding(false)
    }
  }, [isServiceAdded])
  const handleAddService = (id: number) => {
    if (!isServiceAdded && !isAdding) {
      addItem(id)
      setIsAdding(true)
    }
  }
  //@ts-ignore
  return (
    <ul className="additonalService">
      <li className={`additonalService--${isServiceAdded ? 'added' : 'toAdd'}`}>
        {product === null ? 'načítám produkt' : product.name} (
        {isServiceAdded ? (
          <span>služba již přidána</span>
        ) : (
          <span
            className="addAditionalService"
            onClick={() => handleAddService(serviceId)}
          >
            přidat za {product !== null && formatPriceOutput(product.price)}
          </span>
        )}
        )
      </li>
    </ul>
  )
}
