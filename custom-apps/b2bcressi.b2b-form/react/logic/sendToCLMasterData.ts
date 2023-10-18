/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */

const sendToCLMasterData = (
  values: any,
  goToErrorPage: () => void,
  goToSuccessPage: () => void
) => {
  const CLValues = {
    email: values?.email,
    corporateDocument: values?.document,
    stateRegistration: values?.stateRegistration,
    corporateName: values?.corporateName,
    tradeName: values?.tradeName,
    document: values?.document,
    phone: values?.homePhone,
    businessPhone: values?.homePhone,
    homePhone: values?.homePhone,
    firstName: values?.firstName,
    lastName: values?.lastName,
    interestTopics: values?.interestTopics,
    financialInfo: values?.financialInfo,
    isCorporate: false,
    isApproved: true,
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
