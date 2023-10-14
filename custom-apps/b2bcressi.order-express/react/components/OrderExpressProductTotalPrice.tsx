import React, { useContext } from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
import type { Item } from 'vtex.product-context/react/ProductTypes'

// import styles from '../styles.css'
import { getDefaultSeller } from '../utils/utils'
import { OrderExpressContext } from '../contexts/OrderExpressContext'

interface OrderExpressProductTotalPriceProps {
  item?: Item
}

const OrderExpressProductTotalPrice = ({
  item,
}: OrderExpressProductTotalPriceProps) => {
  const { selectedQuantityList } = useContext(OrderExpressContext)

  const price = getDefaultSeller(item?.sellers)?.commertialOffer?.Price ?? 0
  const quantity = Math.max(
    1,
    selectedQuantityList?.find(
      (selectedItem) => selectedItem?.id === item?.itemId
    )?.quantity ?? 1
  )

  const priceWithQuantity = price * quantity

  return <FormattedCurrency value={priceWithQuantity} />
}

export default OrderExpressProductTotalPrice
