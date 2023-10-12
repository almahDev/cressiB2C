import React, { useContext } from 'react'
import type { Item } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'
import { OrderExpressContext } from '../contexts/OrderExpressContext'
import IconCart from '../icons/IconCart'
import { getDefaultSeller } from '../utils/utils'

interface OrderExpressProductQuantityBuyItemProps {
  item?: Item
}

const OrderExpressProductQuantityBuyItem = ({
  item,
}: OrderExpressProductQuantityBuyItemProps) => {
  const [quantity, setQuantity] = React.useState(0)
  console.log(
    '🚀 ~ file: OrderExpressProductQuantityBuy.tsx:14 ~ OrderExpressProductQuantityBuyItem ~ quantity:',
    quantity
  )
  console.log(
    '🚀 ~ file: OrderExpressProductQuantityBuy.tsx:14 ~ OrderExpressProductQuantityBuyItem ~ item:',
    item
  )

  const { selectedItems, setSelectedItems } = useContext(OrderExpressContext)
  console.log(
    '🚀 ~ file: OrderExpressProductQuantityBuy.tsx:13 ~ OrderExpressProductQuantityBuyItem ~ selectedItems:',
    selectedItems
  )

  const isSelected = selectedItems?.find(
    (selecItem) => selecItem?.id === item?.itemId
  )
  console.log(
    '🚀 ~ file: OrderExpressProductQuantityBuyItem.tsx:35 ~ isSelected:',
    isSelected
  )

  const handleSelection = () => {
    if (!setSelectedItems) {
      return
    }

    const seller = getDefaultSeller(item?.sellers)

    const selectedItem = {
      id: item?.itemId,
      quantity,
      seller: seller?.sellerId,
      price: seller?.commertialOffer?.Price,
    }

    setSelectedItems((prev) => {
      const prevFiltered = prev.filter(
        (prevItem) => prevItem.id !== selectedItem.id
      )

      return [...prevFiltered, selectedItem]
    })
  }

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10))

    if (isSelected) {
      handleSelection()
    }
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(
      '🚀 ~ file: OrderExpressProductQuantityBuy.tsx:40 ~ handleButtonClick ~ e:',
      e
    )
    console.log(
      '🚀 ~ file: OrderExpressProductQuantityBuy.tsx:40 ~ handleButtonClick ~ quantity:',
      quantity
    )
    console.log(
      '🚀 ~ file: OrderExpressProductQuantityBuy.tsx:40 ~ handleButtonClick ~ selectedItems:',
      selectedItems
    )
    console.log(
      '🚀 ~ file: OrderExpressProductQuantityBuy.tsx:40 ~ handleButtonClick ~ setSelectedItems:',
      setSelectedItems
    )

    handleSelection()
  }

  return (
    <div
      className={`${styles.productListProductQuantityBuyVariation} w-100 flex justify-center items-center`}
    >
      <input
        type="number"
        className={`${styles.productListProductQuantity} db t-body`}
        alt="Quantidade"
        aria-label="Quantidade"
        min="0"
        value={quantity}
        onChange={handleChangeQuantity}
      />

      <button
        className={`${styles.productListProductBuyButton} flex items-center justify-center pointer`}
        onClick={handleButtonClick}
      >
        <IconCart />
      </button>
    </div>
  )
}

export default OrderExpressProductQuantityBuyItem
