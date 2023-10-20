/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRuntime } from 'vtex.render-runtime'

import sendToCLMasterData from '../logic/sendToCLMasterData'

const useSubmitForm = (isBusiness: boolean) => {
  const { navigate } = useRuntime()

  const goToErrorPage = () => {
    navigate({
      to: '/cadastro/erro',
    })
  }

  const goToSuccessPage = () => {
    navigate({
      to: '/cadastro/sucesso',
    })
  }

  const submitMasterData = (values: any) => {
    if (!values) {
      return
    }

    sendToCLMasterData(values, isBusiness, goToErrorPage, goToSuccessPage)
  }

  return submitMasterData
}

export default useSubmitForm
