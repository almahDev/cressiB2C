import React from 'react'

import styles from '../styles.css'

const IconHide = () => {
  // className={styles.iconHide}
  return (
    <svg
      className={styles.iconHide}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="17" height="17" rx="0.5" stroke="black" />
      <path
        d="M3 9H9.75H15"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconHide
