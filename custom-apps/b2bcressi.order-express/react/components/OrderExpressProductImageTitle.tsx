import React from 'react'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'
import { imageUrl } from '../utils/aspectRatioUtil'

interface OrderExpressProductImageTitleProps {
  product?: MaybeProduct
}

const DEFAULT_WIDTH = 154
const DEFAULT_HEIGHT = 134
const MAX_SIZE = 154

const OrderExpressProductImageTitle = ({
  product,
}: OrderExpressProductImageTitleProps) => {
  return (
    <div
      className={`${styles.productListProductImageTitle} w-100 flex justify-center items-start`}
    >
      <img
        className={`${styles.productListProductImage} w-100 h-100 db`}
        src={imageUrl(
          product?.items?.[0]?.images?.[0]?.imageUrl ?? '',
          DEFAULT_WIDTH,
          DEFAULT_HEIGHT,
          MAX_SIZE
        )}
        alt={product?.items?.[0]?.images?.[0]?.imageText ?? ''}
        title={product?.items?.[0]?.images?.[0]?.imageText ?? ''}
      />

      <h3
        className={`${styles.productListText} ${styles.productListProductTitle} w-100 t-heading-3`}
      >
        {product?.productName}
      </h3>
    </div>
  )
}

export default OrderExpressProductImageTitle
