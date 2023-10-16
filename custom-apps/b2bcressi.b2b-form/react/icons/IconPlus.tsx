import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['iconPlus'] as const

const IconPlus = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <svg
      className={handles.iconPlus}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="1" width="23" height="23" rx="11.5" fill="white" />
      <path
        d="M12 5.5V19.5"
        stroke="#EA133D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12.5H19"
        stroke="#EA133D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="0.5" y="1" width="23" height="23" rx="11.5" stroke="#CCCCCC" />
    </svg>
  )
}

export default IconPlus
