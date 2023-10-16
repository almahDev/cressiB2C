/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRuntime } from 'vtex.render-runtime'

import sendToCLMasterData from '../logic/sendToCLMasterData'
// import { isIOAccount } from '../utils/utils'

const useSubmitForm = () => {
  // const [nextSubmit, setNextSubmit] = useState(false)
  const { navigate } = useRuntime()

  // const isIO = isIOAccount(account)

  // console.log('== data', data)
  // console.log('== loading', loading)
  // console.log('== error', error)
  // console.log('== called', called)
  // console.log('== sendToCLEntity', sendToCLEntity)

  // console.log('== formValues', formValues)
  // console.log('== setFormValues', setFormValues)

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
    // console.log('values', values)

    // console.log(
    //   '🚀 ~ file: useSubmitForm.tsx:44 ~ submitMasterData ~ values:',
    //   values
    // )

    if (!values) {
      return
    }

    // console.log(
    //   '🚀 ~ file: useSubmitForm.tsx:44 ~ submitMasterData ~ currentValues:',
    //   currentValues
    // )

    sendToCLMasterData(values, goToErrorPage, goToSuccessPage)
  }

  return submitMasterData
}

export default useSubmitForm
