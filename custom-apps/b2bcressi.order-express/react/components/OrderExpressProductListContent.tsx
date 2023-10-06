import React from 'react'
import { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

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
    <div className={`${styles.orderExpressProductListContentContainer}`}>
      <div className={`${styles.orderExpressProductListContentHead}`}>
        <div className={`${styles.orderExpressProductListContentHeadItem}`}>
          Nome/produto
        </div>

        <div className={`${styles.orderExpressProductListContentHeadItem}`}>
          Categoria
        </div>

        <div className={`${styles.orderExpressProductListContentHeadItem}`}>
          Variações
        </div>

        <div className={`${styles.orderExpressProductListContentHeadItem}`}>
          Valor Unitário
        </div>

        <div className={`${styles.orderExpressProductListContentHeadItem}`}>
          QUANTIDADE
        </div>

        <div className={`${styles.orderExpressProductListContentHeadItem}`}>
          VALOR TOTAL
        </div>
      </div>
    </div>
  )
}

export default OrderExpressProductListContent
