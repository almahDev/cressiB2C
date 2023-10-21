import React from 'react'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'
import OrderExpressProductQuantityBuyItem from './OrderExpressProductQuantityBuyItem'

interface OrderExpressQuantityBuyProps {
  product?: MaybeProduct
}

const OrderExpressQuantityBuy = ({ product }: OrderExpressQuantityBuyProps) => {
  return (
    <div
      className={`${styles.productListProductQuantityBuy} w-100 flex flex-column justify-between items-center`}
    >
      {product?.items?.map((item) => (
        <OrderExpressProductQuantityBuyItem
          key={`table-product-quantity-buy-item-${item?.name}`}
          item={item}
        />
      ))}
    </div>
  )
}

export default OrderExpressQuantityBuy
