import React, { useContext } from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'
import { getDefaultSeller } from '../utils/utils'
import { OrderExpressContext } from '../contexts/OrderExpressContext'

interface OrderExpressProductPricesProps {
  product?: MaybeProduct
  isTotalPrice?: boolean
}

const OrderExpressProductPrices = ({
  product,
  isTotalPrice = false,
}: OrderExpressProductPricesProps) => {
  const { selectedItems } = useContext(OrderExpressContext)

  console.log(
    '🚀 ~ file: OrderExpressProductPrices.tsx:16 ~ isTotalPrice:',
    isTotalPrice
  )

  return (
    <div
      className={`${styles.productListProductPrices} w-100 flex flex-column justify-between items-center`}
    >
      {product?.items?.map((item) => (
        <div
          key={`table-product-${product?.productId}-variation-${item?.name}`}
          className={`${styles.productListProductPrice} ${styles.productListText} t-body`}
        >
          {isTotalPrice ? (
            <FormattedCurrency
              value={
                (getDefaultSeller(item?.sellers)?.commertialOffer?.Price ?? 0) *
                (selectedItems?.find(
                  (selectedItem) => selectedItem?.id === item?.itemId
                )?.quantity ?? 0)
              }
            />
          ) : (
            <FormattedCurrency
              value={getDefaultSeller(item?.sellers)?.commertialOffer?.Price}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default OrderExpressProductPrices
