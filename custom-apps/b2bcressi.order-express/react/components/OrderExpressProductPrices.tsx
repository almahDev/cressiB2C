import React from 'react'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'
import { getDefaultSeller } from '../utils/utils'

interface OrderExpressProductPricesProps {
  product?: MaybeProduct
  isTotalPrice?: boolean
}

const OrderExpressProductPrices = ({
  product,
  isTotalPrice = false,
}: OrderExpressProductPricesProps) => {
  console.log(
    '🚀 ~ file: OrderExpressProductPrices.tsx:16 ~ isTotalPrice:',
    isTotalPrice
  )

  return (
    <div
      className={`${styles.productListProductPrices} w-100 flex flex-column justify-start items-center`}
    >
      {product?.items?.map((item) => (
        <div
          key={`table-product-${product?.productId}-variation-${item?.name}`}
          className={`${styles.productListProductPrice} ${styles.productListText} t-body`}
        >
          {getDefaultSeller(item?.sellers)?.commertialOffer?.Price}
        </div>
      ))}
    </div>
  )
}

export default OrderExpressProductPrices
