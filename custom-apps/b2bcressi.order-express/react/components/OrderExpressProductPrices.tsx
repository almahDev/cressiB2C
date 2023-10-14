import React from 'react'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'
import OrderExpressProductTotalPrice from './OrderExpressProductTotalPrice'
import OrderExpressProductPrice from './OrderExpressProductPrice'

interface OrderExpressProductPricesProps {
  product?: MaybeProduct
  isTotalPrice?: boolean
}

const OrderExpressProductPrices = ({
  product,
  isTotalPrice = false,
}: OrderExpressProductPricesProps) => {
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
            <OrderExpressProductTotalPrice item={item} />
          ) : (
            <OrderExpressProductPrice item={item} />
          )}
        </div>
      ))}
    </div>
  )
}

export default OrderExpressProductPrices
