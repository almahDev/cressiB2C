import React, { useContext } from 'react'
import type { Item } from 'vtex.product-context/react/ProductTypes'
import { Spinner } from 'vtex.styleguide'

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
  const [quantity, setQuantity] = React.useState(1)

  const {
    selectedItems,
    setSelectedItems,
    setSelectedQuantityList,
    globalLoading,
    setGlobalLoading,
  } = useContext(OrderExpressContext)

  const isSelected = selectedItems?.find(
    (selecItem) => selecItem?.id === item?.itemId
  )

  const handleSelection = () => {
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

    setGlobalLoading(true)

    setTimeout(() => {
      setGlobalLoading(false)
    }, 500)
  }

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueQuantity = parseInt(e.target.value, 10)

    setQuantity(valueQuantity)

    const selectedItem = {
      id: item?.itemId,
      quantity: valueQuantity,
    }

    setSelectedQuantityList((prev) => {
      const prevFiltered = prev.filter(
        (prevItem) => prevItem.id !== selectedItem.id
      )

      return [...prevFiltered, selectedItem]
    })

    handleSelection()

    // if (isSelected) {
    //   handleSelection()
    // }
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

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
        min="1"
        value={quantity}
        onChange={handleChangeQuantity}
      />

      <button
        className={`${styles.productListProductBuyButton} flex items-center justify-center pointer`}
        onClick={handleButtonClick}
      >
        {globalLoading && isSelected ? (
          <Spinner size={20} color="white" />
        ) : (
          <IconCart />
        )}
      </button>
    </div>
  )
}

export default OrderExpressProductQuantityBuyItem
