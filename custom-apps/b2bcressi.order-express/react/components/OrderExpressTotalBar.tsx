import React, { useContext } from 'react'
import { FormattedCurrency } from 'vtex.format-currency'

import styles from '../styles.css'
import { OrderExpressContext } from '../contexts/OrderExpressContext'

interface OrderExpressTotalBarProps {
  sticky?: boolean
}

const OrderExpressTotalBar = ({
  sticky = false,
}: OrderExpressTotalBarProps) => {
  const { selectedItems } = useContext(OrderExpressContext)

  const subtotal = selectedItems?.reduce((acc, item) => {
    const price = item.price ?? 0
    const quantity = item.quantity ?? 1

    return acc + price * quantity
  }, 0)

  console.log(
    '🚀 ~ file: OrderExpressTotalBar.tsx:31 ~ subtotal ~ subtotal:',
    subtotal
  )

  // const isEmpty = selectedItems?.length === 0 || subtotal === 0
  // console.log('🚀 ~ file: OrderExpressTotalBar.tsx:33 ~ isEmpty:', isEmpty)

  const addtoCart = () => {
    // setLoading(true)

    const linkItems = selectedItems?.reduce(
      (currentItems: string, item: any) =>
        `${currentItems}sku=${item?.id}&qty=${item?.quantity || 1}&seller=${
          item?.seller
        }&`,
      ''
    )

    // window.location.href = `/checkout/cart/add?${linkItems}sc=${channel}`
    window.location.href = `/checkout/cart/add?${linkItems}sc=1`
  }

  return (
    <div
      className={`${styles.totalBar} ${
        sticky ? `${styles.totalBarSticky}` : ''
      } w-100 flex items-center justify-end`}
    >
      <div className={`${styles.totalBarSubtotal} t-body`}>
        Subtotal:{' '}
        <span className={`${styles.totalBarSubtotalPrice} t-body`}>
          <FormattedCurrency value={subtotal} />
        </span>
      </div>

      <button
        className={`${styles.totalBarSubmitButton} t-body`}
        onClick={addtoCart}
      >
        Finalizar Pedido
      </button>
    </div>
  )
}

export default OrderExpressTotalBar
