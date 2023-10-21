import { useDisclosure } from '@vtex/disclosure'
import React, { useEffect } from 'react'

interface DisclosureStateTriggerProps {
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const DisclosureStateTrigger = ({
  setIsExpanded,
}: DisclosureStateTriggerProps) => {
  const { state } = useDisclosure()
  const visible = state?.visible ?? false

  useEffect(() => {
    setIsExpanded(visible)
  }, [visible])

  return <></>
}

export default DisclosureStateTrigger
