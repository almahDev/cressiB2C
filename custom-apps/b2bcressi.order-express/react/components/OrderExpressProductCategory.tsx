import React from 'react'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'

interface OrderExpressProductCategoryProps {
  product?: MaybeProduct
}

const OrderExpressProductCategory = ({
  product,
}: OrderExpressProductCategoryProps) => {
  if (!product?.categoryTree || !product?.categoryTree?.length) {
    return <></>
  }

  const category =
    product?.categoryTree?.[product?.categoryTree?.length - 1]?.name

  return (
    <div
      className={`${styles.productListProductCategory} ${styles.productListText} w-100 flex justify-center items-start t-body`}
    >
      {category}
    </div>
  )
}

export default OrderExpressProductCategory
