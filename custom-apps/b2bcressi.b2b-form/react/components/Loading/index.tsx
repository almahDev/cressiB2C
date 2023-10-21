import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Spinner } from 'vtex.styleguide'

const CSS_HANDLES = ['loading'] as const

const Loading = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={`${handles.loading} c-on-action-secondary flex items-center justify-center w-100`}
    >
      <Spinner color="currentColor" />
    </div>
  )
}

export default Loading
