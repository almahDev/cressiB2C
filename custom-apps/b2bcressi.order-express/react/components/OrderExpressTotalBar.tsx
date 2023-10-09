import React from 'react'

import styles from '../styles.css'

interface OrderExpressTotalBarProps {
  sticky?: boolean
}

const OrderExpressTotalBar = ({
  sticky = false,
}: OrderExpressTotalBarProps) => {
  return (
    <div
      className={`${styles.totalBar} ${
        sticky ? `${styles.totalBarSticky}` : ''
      } w-100 flex items-center justify-end`}
    >
      <div className={`${styles.totalBarSubtotal} t-body`}>
        Subtotal:{' '}
        <span className={`${styles.totalBarSubtotalPrice} t-body`}>
          R$ 9999,99
        </span>
      </div>

      <button className={`${styles.totalBarSubmitButton} t-body`}>
        Finalizar Pedido
      </button>
    </div>
  )
}

export default OrderExpressTotalBar
