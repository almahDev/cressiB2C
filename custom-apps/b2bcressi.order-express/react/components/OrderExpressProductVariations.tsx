import React from 'react'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'

interface OrderExpressProductVariationsProps {
  product?: MaybeProduct
}

const OrderExpressProductVariations = ({
  product,
}: OrderExpressProductVariationsProps) => {
  return (
    <div
      className={`${styles.productListProductVariations} w-100 flex flex-column justify-between items-center`}
    >
      {product?.items?.map((item) => (
        <div
          key={`table-product-${product?.productId}-variation-${item?.name}`}
          className={`${styles.productListProductVariation} ${styles.productListText} t-body`}
        >
          {/* {parseVariations(item?.name)} */}
          {item?.variations?.map((variation, index) => (
            <span
              key={`table-product-${product?.productId}-variation-${item?.name}-${variation?.name}`}
            >
              <b>{variation?.name}</b>: {variation?.values?.join(',')}{' '}
              {index < item?.variations?.length - 1 ? ' - ' : ''}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default OrderExpressProductVariations
