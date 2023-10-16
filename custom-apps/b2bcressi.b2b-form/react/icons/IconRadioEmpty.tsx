import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['iconRadioEmpty'] as const

const IconRadioEmpty = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <svg
      className={handles.iconRadioEmpty}
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8.5" r="7.5" fill="white" stroke="#CCCCCC" />
    </svg>
  )
}

export default IconRadioEmpty
