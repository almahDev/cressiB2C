import React from 'react'

import styles from '../styles.css'
import { OrderExpressContextProvider } from '../contexts/OrderExpressContext'
import OrderExpressTotalBar from './OrderExpressTotalBar'
import OrderExpressTitle from './OrderExpressTitle'
import OrderExpressProductList from './OrderExpressProductList'
import { mockCollections } from '../mocks/collections'
import { Loading } from 'vtex.render-runtime'

export type CollectionProps = {
  collectionId?: string
}

export interface OrderExpressProps {
  title?: string
  collections?: CollectionProps[]
  hideUnavailableItems?: boolean
}

const OrderExpress: StorefrontFunctionComponent<OrderExpressProps> = ({
  title = 'Pedido Express',
  collections = mockCollections,
  hideUnavailableItems = true,
}) => {
  if (!collections || !collections?.length) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <OrderExpressContextProvider>
      <div
        className={`${styles.container} w-100 flex items-center justify-center mw8 center `}
      >
        <div className={`${styles.column} w-100 flex flex-column`}>
          <OrderExpressTotalBar sticky />

          <OrderExpressTitle title={title} />

          <OrderExpressProductList
            collections={collections}
            hideUnavailableItems={hideUnavailableItems}
          />

          <OrderExpressTotalBar />
        </div>
      </div>
    </OrderExpressContextProvider>
  )
}

OrderExpress.defaultProps = {
  title: 'Pedido Express',
  collections: mockCollections,
  hideUnavailableItems: true,
}

OrderExpress.schema = {
  title: 'Pedido Express',
  type: 'object',
  properties: {
    title: {
      title: 'Título',
      type: 'string',
      default: 'Pedido Express',
    },
    hideUnavailableItems: {
      title: 'Esconder os produtos indisponíveis?',
      type: 'boolean',
      default: true,
    },
    collections: {
      title: 'Coleções',
      type: 'array',
      default: mockCollections,
      items: {
        title: 'Coleção',
        type: 'object',
        properties: {
          collectionId: {
            title: 'ID da Coleção',
            type: 'string',
          },
        },
      },
    },
  },
}

export default OrderExpress
