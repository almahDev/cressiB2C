import React from 'react'

import IconTitleLine from '../icons/IconTitleLine'
import styles from '../styles.css'

interface OrderExpressTitleProps {
  title?: string
}

const OrderExpressTitle = ({ title }: OrderExpressTitleProps) => {
  return (
    <div
      className={`${styles.titleContainer} flex items-center justify-between`}
    >
      <h1
        className={`${styles.title} w-100 t-heading-1 c-on-base flex items-center justify-start`}
      >
        <IconTitleLine /> <span>{title}</span>
      </h1>
    </div>
  )
}

export default OrderExpressTitle
