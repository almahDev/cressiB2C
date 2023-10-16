import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import type { FormStepContentProps } from '../FormStep'
import { CSS_HANDLES } from '../FormStep'
import { countryStates } from '../../utils/countryStates'
import FormInput from '../FormInput'
import FormStepRequiredText from '../FormStepRequiredText'
import IconCheckboxSelected from '../../icons/IconCheckboxSelected'
import IconCheckbox from '../../icons/IconCheckbox'

const FormStepContentThree = ({
  errors,
  touched,
  values,
  nextStep,
  setFieldValue,
  validateForm,
}: FormStepContentProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [clicked, setClicked] = useState(false)
  const [businessShipping, setBusinessShipping] = useState(false)

  const requiredFields = [
    'emp_cep',
    'emp_endereco',
    'emp_numero',
    'emp_bairro',
    'emp_estado',
  ]

  const isValid = requiredFields.every(
    (field) => !errors?.[field] && touched?.[field] && values?.[field]
  )

  const toggleBusinessShipping = () => {
    setBusinessShipping((state) => !state)
  }

  const handleClick = () => {
    if (!isValid) {
      return
    }

    if (!clicked) {
      nextStep()
    }

    setClicked(true)

    window.location.hash = '#step-4'
  }

  useEffect(() => {
    if (!setFieldValue) {
      return
    }

    if (businessShipping) {
      setFieldValue('emp_cep', values?.cep, true)
      setFieldValue('emp_endereco', values?.endereco, true)
      setFieldValue('emp_numero', values?.numero, true)
      setFieldValue('emp_bairro', values?.bairro, true)
      setFieldValue('emp_complemento', values?.complemento, true)
      setFieldValue('emp_estado', values?.estado, true)
      setFieldValue('emp_cidade', values?.cidade, true)
    } else {
      setFieldValue('emp_cep', '', true)
      setFieldValue('emp_endereco', '', true)
      setFieldValue('emp_numero', '', true)
      setFieldValue('emp_bairro', '', true)
      setFieldValue('emp_complemento', '', true)
      setFieldValue('emp_estado', '', true)
      setFieldValue('emp_cidade', '', true)
    }

    validateForm()

    setTimeout(() => {
      validateForm()
    }, 500)
  }, [businessShipping])

  return (
    <div
      className={`${handles.formStepContent} ${handles.formStepContentThree} flex flex-column w-100 h-100 items-stretch justify-center`}
    >
      <div
        className={`${handles.formBusinessShippingBlock} ${
          businessShipping ? `${handles.formBusinessShippingSelected}` : ''
        } w-100 flex items-center justify-start pb7 c-on-base t-small pointer`}
        onClick={toggleBusinessShipping}
        role="presentation"
      >
        <span className={`${handles.formBusinessShippingIcon} flex pr3`}>
          {businessShipping ? <IconCheckboxSelected /> : <IconCheckbox />}
        </span>{' '}
        <FormattedMessage id="store/b2b-form.use-shipping-business-text" />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="emp_cep"
          label="CEP"
          placeholder="Digite o CEP"
          error={errors?.emp_cep && touched?.emp_cep}
          success={!errors?.emp_cep && touched?.emp_cep}
          mask="99999-999"
          required
        />

        <FormInput
          field="emp_endereco"
          label="Endereço"
          placeholder="Digite o endereço"
          error={errors?.emp_endereco && touched?.emp_endereco}
          success={!errors?.emp_endereco && touched?.emp_endereco}
          required
        />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="emp_numero"
          label="Número"
          placeholder="Digite o número do endereço"
          error={errors?.emp_numero && touched?.emp_numero}
          success={!errors?.emp_numero && touched?.emp_numero}
          required
        />

        <FormInput
          field="emp_complemento"
          label="Complemento"
          placeholder="Digite o complemento"
          error={errors?.emp_complemento && touched?.emp_complemento}
          success={!errors?.emp_complemento && touched?.emp_complemento}
        />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="emp_bairro"
          label="Bairro"
          placeholder="Digite o bairro"
          error={errors?.emp_bairro && touched?.emp_bairro}
          success={!errors?.emp_bairro && touched?.emp_bairro}
          required
        />

        <FormInput
          field="emp_cidade"
          label="Cidade"
          placeholder="Digite a cidade"
          error={errors?.emp_cidade && touched?.emp_cidade}
          success={!errors?.emp_cidade && touched?.emp_cidade}
          required
        />
      </div>

      <FormInput
        field="emp_estado"
        label="Estado"
        error={errors?.emp_estado && touched?.emp_estado}
        success={!errors?.emp_estado && touched?.emp_estado}
        component="select"
        required
      >
        <option disabled selected value="">
          Selecione uma opção...
        </option>

        {countryStates?.map((state) => (
          <option key={`estado-${state?.sigla}`} value={state?.nome}>
            {state?.nome}
          </option>
        ))}
      </FormInput>

      <FormStepRequiredText />

      <button
        className={`${handles.formStepNextButton} ${
          !isValid ? `${handles.formStepButtonDisabled}` : ''
        } flex items-center justify-center pointer bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer`}
        onClick={handleClick}
        type="button"
      >
        <FormattedMessage id="store/b2b-form.next-button-text" />
      </button>
    </div>
  )
}

export default FormStepContentThree
