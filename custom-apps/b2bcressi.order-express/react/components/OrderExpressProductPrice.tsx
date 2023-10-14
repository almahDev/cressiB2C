import React from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
import type { Item } from 'vtex.product-context/react/ProductTypes'

// import styles from '../styles.css'
import { getDefaultSeller } from '../utils/utils'

interface OrderExpressProductPriceProps {
  item?: Item
}

const OrderExpressProductPrice = ({ item }: OrderExpressProductPriceProps) => {
  const price = getDefaultSeller(item?.sellers)?.commertialOffer?.Price ?? 0

  return <FormattedCurrency value={price} />
}

export default OrderExpressProductPrice
