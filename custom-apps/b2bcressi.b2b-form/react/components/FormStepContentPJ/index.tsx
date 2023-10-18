import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { Spinner } from 'vtex.styleguide'

import type { FormStepContentProps } from '../FormStep'
import { CSS_HANDLES } from '../FormStep'
import FormInput from '../FormInput'
import FormStepRequiredText from '../FormStepRequiredText'
import useSearchData from '../../hooks/useSearchData'

const FormStepContentPJ = ({
  errors,
  touched,
  values,
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

  const { handles } = useCssHandles(CSS_HANDLES)

  const requiredFieldsPJ = [
    'razao_social',
    'nome_fantasia',
    'cnpj',
    'ie',
    'data_abertura',
    'celular',
    'telefone',
  ]

  const isValid = requiredFieldsPJ.every(
    (field) => !errors?.[field] && touched?.[field] && values?.[field]
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    setLoading(true)

    if (!isValid) {
      e.preventDefault()
      e.stopPropagation()

      setLoading(false)

      return
    }

    searchCLDocument(values?.email, values?.cnpj)
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

      return
    }

    setShowError(false)
    setLoading(false)

    window.location.hash = '#step-2'
  }, [searchCLData, searchCLLoading, searchCLCalled, searchCLError])

  return (
    <div
      className={`${handles.formStepContent} ${handles.formStepContentPJ} flex flex-column w-100 h-100 items-stretch justify-center`}
    >
      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="cnpj"
          placeholder="CNPJ"
          error={errors?.cnpj && touched?.cnpj}
          success={!errors?.cnpj && touched?.cnpj}
          mask="99.999.999/9999-99"
          required
        />

        <FormInput
          field="ie"
          placeholder="Inscrição estadual"
          error={errors?.ie && touched?.ie}
          success={!errors?.ie && touched?.ie}
          required
        />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="razao_social"
          placeholder="Digite a razão social"
          error={errors?.razao_social && touched?.razao_social}
          success={!errors?.razao_social && touched?.razao_social}
          required
        />

        <FormInput
          field="nome_fantasia"
          placeholder="Digite o nome fantasia"
          error={errors?.nome_fantasia && touched?.nome_fantasia}
          success={!errors?.nome_fantasia && touched?.nome_fantasia}
          required
        />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      />

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

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="data_abertura"
          label="Data de abertura"
          placeholder="__/__/____"
          error={errors?.data_abertura && touched?.data_abertura}
          success={!errors?.data_abertura && touched?.data_abertura}
          mask="99/99/9999"
          required
        />

        <FormInput
          field="celular"
          label="Celular"
          placeholder="(__) 0000-0000"
          error={errors?.ie && touched?.ie}
          success={!errors?.ie && touched?.ie}
          mask="(99) 99999-9999"
          required
        />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="telefone"
          label="Telefone Comercial"
          placeholder="(__) 0000-0000"
          error={errors?.telefone && touched?.telefone}
          success={!errors?.telefone && touched?.telefone}
          mask="(99) 9999-9999"
          required
        />

        <FormInput
          field="site"
          label="Site da loja/empresa"
          placeholder="Digite o site da sua loja/empresa"
          error={errors?.site && touched?.site}
          success={!errors?.site && touched?.site}
        />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="instagram"
          label="Instagram da loja/empresa"
          placeholder="Digite o Instagram da sua loja/empresa"
          error={errors?.instagram}
          success={!errors?.instagram && touched?.instagram}
        />

        <FormInput
          field="facebook"
          label="Facebook da loja/empresa"
          placeholder="Digite o Facebook da sua loja/empresa"
          error={errors?.facebook}
          success={!errors?.facebook && touched?.facebook}
        />
      </div>

      <FormStepRequiredText />

      <button
        className={`${handles.formStepSubmitButton}  ${
          !isValid ? `${handles.formStepButtonDisabled}` : ''
        } ${
          loading || searchCLLoading ? `${handles.formStepButtonLoading}` : ''
        } flex items-center justify-center pointer bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer`}
        onClick={handleClick}
        type="submit"
      >
        {loading ? (
          <Spinner color="currentColor" size="20" />
        ) : (
          <FormattedMessage id="store/b2b-form.submit-button-text" />
        )}
      </button>

      {showError && (
        <div className={`${handles.formError} w-100 c-danger t-mini pt3`}>
          E-mail ou CNPJ já cadastrado! Entre em contato com a loja caso tenha
          dúvidas.
        </div>
      )}
    </div>
  )
}

export default FormStepContentPJ
