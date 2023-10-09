import React from 'react'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import OrderExpressProductImageTitle from './OrderExpressProductImageTitle'
import styles from '../styles.css'
import OrderExpressProductCategory from './OrderExpressProductCategory'
import OrderExpressProductVariations from './OrderExpressProductVariations'
import OrderExpressProductPrices from './OrderExpressProductPrices'
import OrderExpressQuantityBuy from './OrderExpressProductQuantityBuy'

interface OrderExpressProductListItemProps {
  product?: MaybeProduct
}

const OrderExpressProductListItem = ({
  product,
}: OrderExpressProductListItemProps) => {
  return (
    <div className={`${styles.productListProductWrapper} w-100`}>
      <OrderExpressProductImageTitle product={product} />

      <OrderExpressProductCategory product={product} />

      <OrderExpressProductVariations product={product} />

      <OrderExpressProductPrices product={product} />

      <OrderExpressQuantityBuy product={product} />

      <OrderExpressProductPrices product={product} isTotalPrice />
    </div>
  )
}

export default OrderExpressProductListItem
