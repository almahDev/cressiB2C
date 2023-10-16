/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyQuery } from 'react-apollo'

import searchDocuments from '../graphql/searchDocuments.graphql'

const useSearchData = () => {
  const [
    searchCLDocumentsQuery,
    {
      data: searchCLData,
      loading: searchCLLoading,
      called: searchCLCalled,
      error: searchCLError,
    },
  ] = useLazyQuery(searchDocuments, {
    fetchPolicy: 'network-only',
  })

  const [
    searchRVDocumentsQuery,
    {
      data: searchRVData,
      loading: searchRVLoading,
      called: searchRVCalled,
      error: searchRVError,
    },
  ] = useLazyQuery(searchDocuments, {
    fetchPolicy: 'network-only',
  })

  const searchCLDocument = (email: string, document?: string) => {
    // prettier-ignore
    const documentClean = document ? document?.replace('/', '%2F') : document

    const whereString = `email=${email}${
      document ? ` OR document=${documentClean}` : ''
    }`

    searchCLDocumentsQuery({
      variables: {
        acronym: 'CL',
        fields: ['id'],
        where: whereString,
        schema: 'al-form',
      },
    })
  }

  const searchRVDocument = (email: string, cpf?: string, cnpj?: string) => {
    // prettier-ignore
    const cnpjClean = cnpj ? cnpj?.replace('/', '%2F') : cnpj
    const whereString = `email=${email}${cpf ? ` OR cpf=${cpf}` : ''}${
      cnpj ? ` OR cnpj=${cnpjClean}` : ''
    }`

    searchRVDocumentsQuery({
      variables: {
        acronym: 'RV',
        fields: ['id'],
        where: whereString,
        schema: 'al-form',
      },
    })
  }

  return {
    searchCLDocument,
    searchCLData,
    searchCLLoading,
    searchCLCalled,
    searchCLError,
    searchRVDocument,
    searchRVData,
    searchRVLoading,
    searchRVCalled,
    searchRVError,
  }
}

export default useSearchData
