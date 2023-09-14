import React from 'react'
import type { ReactNode, MouseEvent } from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface StopPropagationLayoutProps {
  children: ReactNode
}

export const CSS_HANDLES = ['stopPropagationLayout'] as const

const StopPropagationLayout: React.FC<StopPropagationLayoutProps> = ({
  children,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div
      className={handles.stopPropagationLayout}
      onClick={handleClick}
      role="presentation"
    >
      {children}
    </div>
  )
}

export default StopPropagationLayout
