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

type OrderExpressContextProps = {
  selectedItems?: SelectedItemProps[]
  setSelectedItems?: React.Dispatch<React.SetStateAction<SelectedItemProps[]>>
}

export const OrderExpressContext =
  React.createContext<OrderExpressContextProps>({})

export const OrderExpressContextProvider = ({ children }: Props) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItemProps[]>([])

  return (
    <OrderExpressContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
      }}
    >
      {children}
    </OrderExpressContext.Provider>
  )
}
