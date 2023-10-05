import React from 'react'

import styles from '../styles.css'

interface OrderExpressTotalBarProps {
  sticky?: boolean
}

const OrderExpressTotalBar = ({
  sticky = false,
}: OrderExpressTotalBarProps) => {
  console.log('🚀 ~ file: OrderExpressTotalBar.tsx:10 ~ sticky:', sticky)

  return (
    <div
      className={`${styles.orderExpressTotalBar} ${
        sticky ? `${styles.orderExpressTotalBarSticky}` : ''
      } w-100 flex items-center justify-end`}
    >
      <div className={`${styles.orderExpressTotalBarSubtotal} t-body`}>
        Subtotal:{' '}
        <span className={`${styles.orderExpressTotalBarSubtotalPrice} t-body`}>
          R$ 9999,99
        </span>
      </div>

      <button className={`${styles.orderExpressTotalBarSubmitButton}`}>
        Finalizar Pedido
      </button>
    </div>
  )
}

export default OrderExpressTotalBar
