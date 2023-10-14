/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
import { Spinner } from 'vtex.styleguide'
import type { Session, SessionResponse } from 'vtex.render-runtime'

import styles from '../styles.css'
import { OrderExpressContext } from '../contexts/OrderExpressContext'
import useSessionResponse from '../hooks/useSessionResponse'

interface OrderExpressTotalBarProps {
  sticky?: boolean
}

type SessionExtended = Session & {
  namespaces: {
    store: {
      countryCode: {
        value: string
      }
      channel: {
        value: string
      }
    }
  }
}

const OrderExpressTotalBar = ({
  sticky = false,
}: OrderExpressTotalBarProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { selectedItems, globalLoading } = useContext(OrderExpressContext)
  const sessionResponse: SessionResponse | undefined = useSessionResponse()
  const channel =
    (sessionResponse as SessionExtended)?.namespaces?.store?.channel?.value ||
    '1'

  const subtotal = selectedItems?.reduce((acc, item) => {
    const price = item.price ?? 0
    const quantity = Math.max(1, item.quantity ?? 1)

    return acc + price * quantity
  }, 0)

  // const isEmpty = selectedItems?.length === 0 || subtotal === 0

  const addtoCart = () => {
    setLoading(true)

    const linkItems = selectedItems?.reduce(
      (currentItems: string, item: any) =>
        `${currentItems}sku=${item?.id}&qty=${Math.max(
          1,
          item.quantity ?? 1
        )}&seller=${item?.seller}&`,
      ''
    )

    window.location.href = `/checkout/cart/add?${linkItems}sc=${channel}}`
  }

  return (
    <div
      className={`${styles.totalBar} ${
        sticky ? `${styles.totalBarSticky}` : ''
      } w-100 flex items-center justify-end`}
    >
      <div className={`${styles.totalBarSubtotal} t-body flex items-center`}>
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
