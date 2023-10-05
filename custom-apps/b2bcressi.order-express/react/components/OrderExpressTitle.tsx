import React from 'react'

import IconTitleLine from '../icons/IconTitleLine'
import styles from '../styles.css'

interface OrderExpressTitleProps {
  title?: string
}

const OrderExpressTitle = ({ title }: OrderExpressTitleProps) => {
  return (
    <h1 className={`${styles.orderExpressTitle} w-100 t-heading-1 c-on-base`}>
      <IconTitleLine /> <span>{title}</span>
    </h1>
  )
}

export default OrderExpressTitle
