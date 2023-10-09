import React, { useContext } from 'react'

import styles from '../styles.css'
import { OrderExpressContext } from '../contexts/OrderExpressContext'

interface OrderExpressTotalBarProps {
  sticky?: boolean
}

const OrderExpressTotalBar = ({
  sticky = false,
}: OrderExpressTotalBarProps) => {
  const { selectedItems, setSelectedItems } = useContext(OrderExpressContext)

  console.log(
    '🚀 ~ file: OrderExpressTotalBar.tsx:16 ~ selectedItems:',
    selectedItems
  )
  console.log(
    '🚀 ~ file: OrderExpressTotalBar.tsx:16 ~ setSelectedItems:',
    setSelectedItems
  )

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
