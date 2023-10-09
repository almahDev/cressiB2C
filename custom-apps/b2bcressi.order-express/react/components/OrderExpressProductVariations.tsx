import React from 'react'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'
import { parseVariationName } from '../utils/utils'

interface OrderExpressProductVariationsProps {
  product?: MaybeProduct
}

const OrderExpressProductVariations = ({
  product,
}: OrderExpressProductVariationsProps) => {
  return (
    <div
      className={`${styles.productListProductVariations} w-100 flex flex-column justify-start items-center`}
    >
      {product?.items?.map((item) => (
        <div
          key={`table-product-${product?.productId}-variation-${item?.name}`}
          className={`${styles.productListProductVariation} ${styles.productListText} t-body`}
        >
          {parseVariationName(item?.name)}
        </div>
      ))}
    </div>
  )
}

export default OrderExpressProductVariations
