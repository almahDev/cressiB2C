import React from 'react'
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['b2bChallengeSpinner'] as const

const Loading = () => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={`${handles.b2bChallengeSpinner} flex items-center justify-center w-100 h-100`}
    >
      <Spinner className={`${handles.b2bChallengeSpinner}`} />
    </div>
  )
}

export default Loading
