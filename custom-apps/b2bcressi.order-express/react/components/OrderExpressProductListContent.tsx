import React from 'react'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import OrderExpressProductListItem from './OrderExpressProductListItem'
import styles from '../styles.css'

interface OrderExpressProductListContentProps {
  products?: MaybeProduct[]
}

const OrderExpressProductListContent = ({
  products,
}: OrderExpressProductListContentProps) => {
  console.log(
    '🚀 ~ file: OrderExpressProductListContent.tsx:13 ~ products:',
    products
  )

  return (
    <div className={`${styles.productListContentContainer}`}>
      <div className={`${styles.productListContentHead}`}>
        <div className={`${styles.productListContentHeadItem}`}>
          Nome/produto
        </div>

        <div className={`${styles.productListContentHeadItem}`}>Categoria</div>

        <div className={`${styles.productListContentHeadItem}`}>Variações</div>

        <div className={`${styles.productListContentHeadItem}`}>
          Valor Unitário
        </div>

        <div className={`${styles.productListContentHeadItem}`}>QUANTIDADE</div>

        <div className={`${styles.productListContentHeadItem}`}>
          VALOR TOTAL
        </div>
      </div>

      <div
        className={`${styles.productListContentBody} w-100 flex flex-column`}
      >
        {products?.map((product) => (
          <OrderExpressProductListItem
            key={`table-product-${product?.productId}`}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}

export default OrderExpressProductListContent
