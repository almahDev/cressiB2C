import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { Spinner } from 'vtex.styleguide'
import { useFormikContext } from 'formik'

import type { FormStepContentProps } from '../FormStep'
import { CSS_HANDLES } from '../FormStep'
import FormInput from '../FormInput'
// import FormStepRequiredText from '../FormStepRequiredText'
import useSearchData from '../../hooks/useSearchData'
import scrollToFieldError from '../../utils/scrollToFieldError'
import FormCheckboxGroup from '../FormCheckboxGroup'

const FormStepContent = ({
  errors,
  touched,
  values,
  isBusiness = true,
}: FormStepContentProps) => {
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const {
    searchCLDocument,
    searchCLData,
    searchCLCalled,
    searchCLLoading,
    searchCLError,
  } = useSearchData()

  const { setTouched, validateForm, submitForm } = useFormikContext()

  const { handles } = useCssHandles(CSS_HANDLES)

  const requiredFieldsPJ = [
    'document',
    'stateRegistration',
    'corporateName',
    'tradeName',
    'receiverName',
    'street',
    'number',
    'complement',
    'neighborhood',
    'city',
    'state',
    'postalCode',
    'email',
    'homePhone',
  ]

  const requiredFieldsPF = [
    'document',
    'firstName',
    'receiverName',
    'street',
    'number',
    'complement',
    'neighborhood',
    'city',
    'state',
    'postalCode',
    'email',
    'homePhone',
  ]

  const requiredFieldsPJTouched = {
    document: true,
    stateRegistration: true,
    corporateName: true,
    tradeName: true,
    receiverName: true,
    street: true,
    number: true,
    complement: true,
    neighborhood: true,
    city: true,
    state: true,
    postalCode: true,
    email: true,
    homePhone: true,
  }

  const requiredFieldsPFTouched = {
    document: true,
    stateRegistration: true,
    corporateName: true,
    tradeName: true,
    receiverName: true,
    street: true,
    number: true,
    complement: true,
    neighborhood: true,
    city: true,
    state: true,
    postalCode: true,
    email: true,
    homePhone: true,
  }

  const isValid = isBusiness
    ? requiredFieldsPJ.every(
        (field) => !errors?.[field] && touched?.[field] && values?.[field]
      )
    : requiredFieldsPF.every(
        (field) => !errors?.[field] && touched?.[field] && values?.[field]
      )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    setLoading(true)
    setTouched(
      isBusiness ? requiredFieldsPJTouched : requiredFieldsPFTouched,
      true
    )
    validateForm()

    if (!isValid) {
      e.preventDefault()
      e.stopPropagation()

      setLoading(false)
      scrollToFieldError(isValid, errors)

      setTimeout(() => {
        scrollToFieldError(isValid, errors)
      }, 500)

      return
    }

    // searchCLDocument(values?.email, values?.document)
    searchCLDocument(values?.email)
    setShowError(false)
  }

  useEffect(() => {
    if (searchCLLoading || !searchCLCalled || searchCLError) {
      return
    }

    if (
      searchCLData &&
      searchCLData.documents &&
      searchCLData?.documents?.length
    ) {
      setShowError(true)
      setLoading(false)
      scrollToFieldError(isValid, errors)

      return
    }

    setShowError(false)
    // setLoading(false)
    submitForm()
  }, [searchCLData, searchCLLoading, searchCLCalled, searchCLError])

  return (
    <div
      className={`${handles.formStepContent} ${handles.formStepContentPJ} flex flex-column w-100 h-100 items-stretch justify-center`}
    >
      {isBusiness ? (
        <div
          className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
        >
          <FormInput
            field="document"
            placeholder="CNPJ"
            error={errors?.document && touched?.document}
            success={!errors?.document && touched?.document}
            mask="99.999.999/9999-99"
            required
          />

          <FormInput
            field="stateRegistration"
            placeholder="Inscrição estadual"
            error={errors?.stateRegistration && touched?.stateRegistration}
            success={!errors?.stateRegistration && touched?.stateRegistration}
            required
          />
        </div>
      ) : (
        <div
          className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
        >
          <FormInput
            field="document"
            placeholder="CPF"
            error={errors?.document && touched?.document}
            success={!errors?.document && touched?.document}
            mask="999.999.999-99"
            required
          />

          <FormInput
            field="firstName"
            placeholder="Nome completo"
            error={errors?.firstName && touched?.firstName}
            success={!errors?.firstName && touched?.firstName}
            required
          />
        </div>
      )}

      {isBusiness ? (
        <div
          className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
        >
          <FormInput
            field="corporateName"
            placeholder="Razão Social"
            error={errors?.corporateName && touched?.corporateName}
            success={!errors?.corporateName && touched?.corporateName}
            required
          />

          <FormInput
            field="tradeName"
            placeholder="Nome fantasia"
            error={errors?.tradeName && touched?.tradeName}
            success={!errors?.tradeName && touched?.tradeName}
            required
          />
        </div>
      ) : (
        <></>
      )}

      {/* TODO: integração viacep */}

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="receiverName"
          placeholder={isBusiness ? 'Responsável' : 'Credenciadora'}
          error={errors?.receiverName && touched?.receiverName}
          success={!errors?.receiverName && touched?.receiverName}
          required
        />

        <FormInput
          field="street"
          placeholder="Endereço"
          error={errors?.street && touched?.street}
          success={!errors?.street && touched?.street}
          required
        />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="number"
          placeholder="Número"
          error={errors?.number && touched?.number}
          success={!errors?.number && touched?.number}
          required
        />

        <FormInput
          field="complement"
          placeholder="Complemento"
          error={errors?.complement && touched?.complement}
          success={!errors?.complement && touched?.complement}
          required
        />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="neighborhood"
          placeholder="Bairro"
          error={errors?.neighborhood && touched?.neighborhood}
          success={!errors?.neighborhood && touched?.neighborhood}
          required
        />

        <FormInput
          field="city"
          placeholder="Cidade"
          error={errors?.city && touched?.city}
          success={!errors?.city && touched?.city}
          required
        />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="state"
          placeholder="UF"
          error={errors?.state && touched?.state}
          success={!errors?.state && touched?.state}
          required
        />

        <FormInput
          field="postalCode"
          placeholder="CEP"
          error={errors?.postalCode && touched?.postalCode}
          success={!errors?.postalCode && touched?.postalCode}
          mask="99999-999"
          required
        />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="email"
          placeholder="E-Mail"
          type="email"
          error={errors?.email && touched?.email}
          success={
            !errors?.email &&
            touched?.email &&
            values?.email &&
            values?.email.length
          }
          required
        />

        <FormInput
          field="homePhone"
          placeholder="Celular"
          error={errors?.homePhone && touched?.homePhone}
          success={!errors?.homePhone && touched?.homePhone}
          mask="(99) 99999-9999"
          required
        />
      </div>

      {/* <FormStepRequiredText /> */}

      {/* interestTopics: values?.interestTopics,
    financialInfo: values?.financialInfo, */}

      <FormCheckboxGroup
        field="interestTopics"
        label="TÓPICOS DE INTERESSE:"
        values={['Atacado', 'Integrações', 'Newsletter']}
        error={errors?.interestTopics && touched?.interestTopics}
        success={!errors?.interestTopics && touched?.interestTopics}
        originalValues={values?.interestTopics}
      />

      <FormInput
        field="financialInfo"
        placeholder="Relações comerciais de fornecedores (nomes e contatos financeiros)"
        error={errors?.financialInfo && touched?.financialInfo}
        success={!errors?.financialInfo && touched?.financialInfo}
        component="textarea"
      />

      <button
        className={`${handles.formStepSubmitButton}  ${
          !isValid ? `${handles.formStepButtonDisabled}` : ''
        } ${
          loading || searchCLLoading ? `${handles.formStepButtonLoading}` : ''
        } flex items-center justify-center pointer bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer`}
        onClick={handleClick}
        type="button"
      >
        {loading ? (
          <Spinner color="currentColor" size="20" />
        ) : (
          <FormattedMessage id="store/b2b-form.submit-button-text" />
        )}
      </button>

      {showError && (
        <div className={`${handles.formError} w-100 c-danger t-mini pt3`}>
          {/* E-mail ou CNPJ já cadastrado! Entre em contato com a loja caso tenha */}
          E-mail já cadastrado! Entre em contato com a loja caso tenha dúvidas.
        </div>
      )}
    </div>
  )
}

export default FormStepContent
