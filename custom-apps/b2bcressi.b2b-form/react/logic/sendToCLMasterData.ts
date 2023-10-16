/* eslint-disable @typescript-eslint/no-explicit-any */

const sendToCLMasterData = (
  values: any,
  goToErrorPage: () => void,
  goToSuccessPage: () => void
) => {
  const CLValues = {
    email: values?.email,
    corporateDocument: values?.cnpj,
    stateRegistration: values?.ie,
    corporateName: values?.razao_social,
    tradeName: values?.nome_fantasia,
    document: values?.cnpj,
    businessPhone: values?.telefone,
    homePhone: values?.celular,
    isCorporate: true,
  }

  const ADValues = {
    postalCode: values?.emp_cep,
    addressName: 'Padrão',
    addressType: 'residential',
    street: values?.emp_endereco,
    number: values?.emp_numero,
    complement: values?.emp_complemento,
    neighborhood: values?.emp_bairro,
    city: values?.emp_cidade,
    state: values?.emp_estado,
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
