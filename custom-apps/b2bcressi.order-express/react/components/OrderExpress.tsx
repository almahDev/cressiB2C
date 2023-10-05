import React from 'react'

import styles from '../styles.css'
import { OrderExpressContextProvider } from '../contexts/OrderExpressContext'
import OrderExpressTotalBar from './OrderExpressTotalBar'
import OrderExpressTitle from './OrderExpressTitle'

interface OrderExpressProps {
  title?: string
}

const OrderExpress: StorefrontFunctionComponent<OrderExpressProps> = ({
  title = 'Pedido Express',
}) => {
  return (
    <OrderExpressContextProvider>
      <div
        className={`${styles.orderExpressContainer} flex w-100 items-center justify-center mw8 center`}
      >
        <OrderExpressTotalBar />

        <OrderExpressTitle title={title} />

        <OrderExpressTotalBar />
      </div>
    </OrderExpressContextProvider>
  )
}

OrderExpress.defaultProps = {
  title: 'Pedido Express',
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
  },
}

export default OrderExpress
