import React, { useContext, useState } from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
import { Spinner } from 'vtex.styleguide'

import styles from '../styles.css'
import { OrderExpressContext } from '../contexts/OrderExpressContext'

interface OrderExpressTotalBarProps {
  sticky?: boolean
}

const OrderExpressTotalBar = ({
  sticky = false,
}: OrderExpressTotalBarProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { selectedItems, globalLoading } = useContext(OrderExpressContext)
  console.log(
    '🚀 ~ file: OrderExpressTotalBar.tsx:15 ~ selectedItems:',
    selectedItems
  )

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
    setLoading(true)

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
          {globalLoading ? (
            <Spinner size={20} color="white" />
          ) : (
            <FormattedCurrency value={subtotal} />
          )}
        </span>
      </div>

      <button
        className={`${styles.totalBarSubmitButton} t-body flex items-center justify-center pointer`}
        onClick={addtoCart}
        disabled={globalLoading || loading}
      >
        {globalLoading || loading ? (
          <Spinner size={20} color="black" />
        ) : (
          'Finalizar Pedido'
        )}
      </button>
    </div>
  )
}

export default OrderExpressTotalBar
