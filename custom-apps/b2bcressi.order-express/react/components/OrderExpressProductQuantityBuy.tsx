import React, { useContext } from 'react'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'
import { OrderExpressContext } from '../contexts/OrderExpressContext'
import IconCart from '../icons/IconCart'

interface OrderExpressQuantityBuyProps {
  product?: MaybeProduct
}

const OrderExpressQuantityBuy = ({ product }: OrderExpressQuantityBuyProps) => {
  const [quantity, setQuantity] = React.useState(0)
  console.log(
    '🚀 ~ file: OrderExpressProductQuantityBuy.tsx:14 ~ OrderExpressQuantityBuy ~ quantity:',
    quantity
  )

  const { selectedItems, setSelectedItems } = useContext(OrderExpressContext)
  console.log(
    '🚀 ~ file: OrderExpressProductQuantityBuy.tsx:13 ~ OrderExpressQuantityBuy ~ selectedItems:',
    selectedItems
  )

  // if (!product?.categoryTree || !product?.categoryTree?.length) {
  //   return <></>
  // }

  // const category =
  //   product?.categoryTree?.[product?.categoryTree?.length - 1]?.name

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10))
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(
      '🚀 ~ file: OrderExpressProductQuantityBuy.tsx:40 ~ handleButtonClick ~ e:',
      e
    )
    console.log(
      '🚀 ~ file: OrderExpressProductQuantityBuy.tsx:40 ~ handleButtonClick ~ product:',
      product
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
    if (!setSelectedItems) {
      return
    }

    setSelectedItems((prev) => [...prev, { product, quantity }])
  }

  return (
    <div
      className={`${styles.productListProductQuantityBuy} w-100 flex justify-center items-start`}
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

export default OrderExpressQuantityBuy
