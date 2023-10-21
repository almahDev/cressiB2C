import React from 'react'
import { useDevice } from 'vtex.device-detector'
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
  const { isMobile } = useDevice()

  return (
    <div
      className={`${styles.productListProductWrapper} ${
        isMobile ? `${styles.productListProductWrapperMobile}` : ''
      } w-100`}
    >
      {isMobile ? (
        <>
          <div className={`${styles.productListProductWrapperMobileRow} flex`}>
            <OrderExpressProductImageTitle product={product} showCategory />
          </div>

          <div className={`${styles.productListProductWrapperMobileRow} flex`}>
            <OrderExpressProductVariations product={product} />

            <OrderExpressProductPrices product={product} isTotalPrice />

            <OrderExpressQuantityBuy product={product} />
          </div>
        </>
      ) : (
        <>
          <OrderExpressProductImageTitle product={product} />

          <OrderExpressProductCategory product={product} />

          <OrderExpressProductVariations product={product} />

          <OrderExpressProductPrices product={product} />

          <OrderExpressQuantityBuy product={product} />

          <OrderExpressProductPrices product={product} isTotalPrice />
        </>
      )}
    </div>
  )
}

export default OrderExpressProductListItem
