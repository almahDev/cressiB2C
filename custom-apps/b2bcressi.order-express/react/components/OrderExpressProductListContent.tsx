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
          <div
            key={`table-product-${product?.productId}`}
            className={`${styles.productListProductWrapper} w-100`}
          >
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

            <div
              className={`${styles.productListProductCategory} ${styles.productListText} w-100 flex justify-center items-start t-body`}
            >
              {product?.categoryTree?.[product?.categoryTree?.length - 1]?.name}
            </div>

            <div
              className={`${styles.productListProductVariations} w-100 flex flex-column justify-start items-center`}
            >
              {product?.items?.map((item) => (
                <div
                  key={`table-product-${product?.productId}-variation-${item?.name}`}
                  className={`${styles.productListProductVariation} ${styles.productListText} t-body`}
                >
                  {item?.name?.replace(' - ', '#####')?.split('#####')?.[1]}
                </div>
              ))}
            </div>

            <div
              className={`${styles.productListProductPrices} w-100 flex flex-column justify-start items-center`}
            >
              {product?.items?.map((item) => (
                <div
                  key={`table-product-${product?.productId}-variation-${item?.name}`}
                  className={`${styles.productListProductPrice} ${styles.productListText} t-body`}
                >
                  {item?.sellers?.[0]?.commertialOffer?.Price}
                </div>
              ))}
            </div>

            <div
              className={`${styles.productListProductQuantityBuy}  ${styles.productListText} w-100 flex justify-center items-start t-body`}
            >
              {product?.categoryTree?.[product?.categoryTree?.length - 1]?.name}
            </div>

            <div
              className={`${styles.productListProductPrices} w-100 flex flex-column justify-center items-start t-body`}
            >
              {product?.items?.map((item) => (
                <div
                  key={`table-product-${product?.productId}-variation-${item?.name}`}
                  className={`${styles.productListProductTotalPrice} ${styles.productListText} t-body`}
                >
                  {item?.sellers?.[0]?.commertialOffer?.Price}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderExpressProductListContent
