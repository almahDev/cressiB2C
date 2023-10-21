/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'

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
  globalLoading: boolean
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export const OrderExpressContext =
  React.createContext<OrderExpressContextProps>({
    selectedItems: [],
    setSelectedItems: () => {},
    selectedQuantityList: [],
    setSelectedQuantityList: () => {},
    globalLoading: true,
    setGlobalLoading: () => {},
    searchValue: '',
    setSearchValue: () => {},
  })

export const OrderExpressContextProvider = ({ children }: Props) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItemProps[]>([])
  const [selectedQuantityList, setSelectedQuantityList] = useState<
    SelectedQuantityListProps[]
  >([])

  const [globalLoading, setGlobalLoading] = useState<boolean>(true)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setGlobalLoading(false)
    }, 1000)
  }, [])

  return (
    <OrderExpressContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        selectedQuantityList,
        setSelectedQuantityList,
        globalLoading,
        setGlobalLoading,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </OrderExpressContext.Provider>
  )
}
