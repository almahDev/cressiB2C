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
        className={`${styles.orderExpressContainer} w-100 flex items-center justify-center mw8 center `}
      >
        <div className={`${styles.orderExpressColumn} w-100 flex flex-column`}>
          <OrderExpressTotalBar sticky />

          <OrderExpressTitle title={title} />

          <OrderExpressTotalBar />
        </div>
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
