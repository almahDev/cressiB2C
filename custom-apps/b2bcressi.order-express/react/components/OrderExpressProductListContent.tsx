import React from 'react'
import { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'
import { imageUrl } from '../utils/aspectRatioUtil'

interface OrderExpressProductListContentProps {
  products?: MaybeProduct[]
}

const DEFAULT_WIDTH = 154
const DEFAULT_HEIGHT = 134
const MAX_SIZE = 154

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

      <div
        className={`${styles.orderExpressProductListContentBody} w-100 flex flex-column`}
      >
        {products?.map((product) => (
          <div
            key={`table-product-${product?.productId}`}
            className={`${styles.orderExpressProductListContentBodyProduct} w-100`}
          >
            <div
              className={`${styles.orderExpressProductListContentBodyProductImageTitle} w-100 flex justify-center items-start`}
            >
              <img
                className={`${styles.orderExpressProductListContentBodyProductImage} w-100 h-100 db`}
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
                className={`${styles.orderExpressProductListContentBodyProductTitle} w-100 t-heading-3`}
              >
                {product?.productName}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderExpressProductListContent
