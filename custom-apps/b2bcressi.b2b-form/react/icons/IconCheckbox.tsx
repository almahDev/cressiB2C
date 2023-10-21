import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['iconCheckbox'] as const

const IconCheckbox = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <svg
      className={handles.iconCheckbox}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="22.5"
        rx="1.25"
        fill="white"
      />
      <rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="22.5"
        rx="1.25"
        stroke="#CCCCCC"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default IconCheckbox
