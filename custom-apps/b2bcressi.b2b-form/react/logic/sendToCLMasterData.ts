/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */

const sendToCLMasterData = (
  values: any,
  isBusiness: boolean,
  goToErrorPage: () => void,
  goToSuccessPage: () => void
) => {
  const CLValues = {
    email: values?.email,
    corporateDocument: isBusiness ? values?.document : undefined,
    stateRegistration: values?.stateRegistration,
    corporateName: values?.corporateName,
    tradeName: values?.tradeName,
    document: values?.document,
    phone: values?.homePhone,
    businessPhone: values?.homePhone,
    homePhone: values?.homePhone,
    firstName: values?.firstName?.split(' ')?.[0],
    lastName: values?.lastName
      ? values?.lastName
      : values?.firstName?.split(' ')?.slice(1)?.join(' '),
    interestTopics: Array.isArray(values?.interestTopics)
      ? values?.interestTopics?.join(', ')
      : values?.interestTopics,
    financialInfo: values?.financialInfo,
    isCorporate: isBusiness,
    approved: false,
    priceTables: isBusiness ? 'lojista' : 'instrutor',
  }

  const ADValues = {
    postalCode: values?.postalCode,
    addressName: 'Padrão',
    addressType: 'residential',
    street: values?.street,
    number: values?.number,
    complement: values?.complement,
    neighborhood: values?.neighborhood,
    city: values?.city,
    state: values?.state,
    receiverName: values?.receiverName,
    country: 'BRA',
  }

  // console.log('CLValues', CLValues)
  // console.log('ADValues', ADValues)

  fetch('/safedata/CL/documents', {
    method: 'PATCH',
    headers: {
      Accept: 'application/vnd.vtex.ds.v10+json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(CLValues),
  })
    .then((response) => response.json())
    .then((response) => {
      // console.log('responseCL', response)

      if (!response) {
        return
      }

      const userId = response?.documentId

      // console.log('userId', userId)

      fetch('/safedata/AD/documents', {
        method: 'PATCH',
        headers: {
          Accept: 'application/vnd.vtex.ds.v10+json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...ADValues,
        }),
      })
        .then((responseAD) => responseAD.json())
        .then((responseAD) => {
          // console.log('responseAD', responseAD)

          if (!responseAD) {
            goToErrorPage()

            return
          }

          goToSuccessPage()
        })
        .catch((errAD) => {
          console.error(errAD)
          goToErrorPage()
        })
    })
    .catch((err) => {
      console.error(err)
      goToErrorPage()
    })
}

export default sendToCLMasterData
