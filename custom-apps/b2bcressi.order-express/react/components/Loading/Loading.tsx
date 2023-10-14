import React from 'react'
import Skeleton from 'react-loading-skeleton'

import styles from './styles.css'
import './skeleton.css'

interface LoadingProps {
  width?: string
  height?: string
  count?: number
}
const Loading = ({
  width = '100%',
  height = '100%',
  count = 1,
}: LoadingProps) => {
  return (
    <Skeleton
      containerClassName={styles.skeletonWrapper}
      height={height}
      width={width}
      count={count}
    />
  )
}

export default Loading
