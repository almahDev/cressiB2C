import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['iconRadio'] as const

const IconRadio = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <svg
      className={handles.iconRadio}
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8.5" r="7.5" fill="white" stroke="#E31C79" />
      <circle cx="8" cy="8.5" r="4" fill="#E31C79" />
    </svg>
  )
}

export default IconRadio
