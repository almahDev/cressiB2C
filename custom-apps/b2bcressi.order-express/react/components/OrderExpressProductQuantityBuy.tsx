import React from 'react'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'

interface OrderExpressQuantityBuyProps {
  product?: MaybeProduct
}

const OrderExpressQuantityBuy = ({ product }: OrderExpressQuantityBuyProps) => {
  if (!product?.categoryTree || !product?.categoryTree?.length) {
    return <></>
  }

  const category =
    product?.categoryTree?.[product?.categoryTree?.length - 1]?.name

  return (
    <div
      className={`${styles.productListProductQuantityBuy}  ${styles.productListText} w-100 flex justify-center items-start t-body`}
    >
      {category}
    </div>
  )
}

export default OrderExpressQuantityBuy
