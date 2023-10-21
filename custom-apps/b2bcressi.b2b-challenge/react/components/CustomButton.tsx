import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useRuntime } from 'vtex.render-runtime'

const CSS_HANDLES = ['b2bChallengeButtonWrapper', 'b2bChallengeButton'] as const

interface Props {
  border?: string
  color?: string
  children?: React.ReactNode
  height?: string
  width?: string
  href: string
  label?: string
  target?: string
  rel?: string
  radius?: string
  variant?: string
}

const CustomButton: React.FC<Props> = ({
  border,
  color,
  children,
  height,
  width,
  href,
  label,
  variant,
  radius,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { navigate } = useRuntime()
  const returnUrl =
    window && window?.location
      ? encodeURIComponent(
          `${window?.location.pathname}${window?.location?.search}`
        )
      : ''

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigate({ to: href?.replace('{returnUrl}', returnUrl) })
  }

  return (
    <form className={`${handles.b2bChallengeButtonWrapper}`}>
      <button
        className={`${handles.b2bChallengeButton} z-max relative ${variant} c-action-secondary pointer pv5 ph5 bn t-body w-100 bg-transparent tl`}
        onClick={handleClick}
        style={{
          backgroundColor: color,
          border,
          borderRadius: radius,
          height,
          width,
        }}
      >
        {label}
        {children}
      </button>
    </form>
  )
}

export default CustomButton
