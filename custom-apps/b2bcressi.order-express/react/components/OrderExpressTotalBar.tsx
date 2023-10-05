import React from 'react'

interface OrderExpressTotalBarProps {
  sticky?: boolean
}

const OrderExpressTotalBar = ({
  sticky = false,
}: OrderExpressTotalBarProps) => {
  console.log('🚀 ~ file: OrderExpressTotalBar.tsx:10 ~ sticky:', sticky)
  return <div>OrderExpressTotalBar {sticky}</div>
}

export default OrderExpressTotalBar
