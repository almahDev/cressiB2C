/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

type Props = {
  children?: React.ReactNode
}

export type SelectedItemProps = {
  id?: string
  quantity?: number
  seller?: string
  price?: number
}

export type SelectedQuantityListProps = {
  id?: string
  quantity?: number
}

type OrderExpressContextProps = {
  selectedItems: SelectedItemProps[]
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItemProps[]>>
  selectedQuantityList: SelectedQuantityListProps[]
  setSelectedQuantityList: React.Dispatch<
    React.SetStateAction<SelectedQuantityListProps[]>
  >
}

export const OrderExpressContext =
  React.createContext<OrderExpressContextProps>({
    selectedItems: [],
    setSelectedItems: () => {},
    selectedQuantityList: [],
    setSelectedQuantityList: () => {},
  })

export const OrderExpressContextProvider = ({ children }: Props) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItemProps[]>([])
  const [selectedQuantityList, setSelectedQuantityList] = useState<
    SelectedQuantityListProps[]
  >([])

  return (
    <OrderExpressContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        selectedQuantityList,
        setSelectedQuantityList,
      }}
    >
      {children}
    </OrderExpressContext.Provider>
  )
}
