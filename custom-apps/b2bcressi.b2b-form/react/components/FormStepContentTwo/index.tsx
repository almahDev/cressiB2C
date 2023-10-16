import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import type { FormStepContentProps } from '../FormStep'
import { CSS_HANDLES } from '../FormStep'
import { countryStates } from '../../utils/countryStates'
import FormInput from '../FormInput'
import FormStepRequiredText from '../FormStepRequiredText'

const FormStepContentTwo = ({
  errors,
  touched,
  values,
  nextStep,
}: FormStepContentProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [clicked, setClicked] = useState(false)

  const requiredFields = ['cep', 'endereco', 'numero', 'bairro', 'estado']

  const isValid = requiredFields.every(
    (field) => !errors?.[field] && touched?.[field] && values?.[field]
  )

  const handleClick = () => {
    if (!isValid) {
      return
    }

    if (!clicked) {
      nextStep()
    }

    setClicked(true)

    window.location.hash = '#step-3'
  }

  return (
    <div
      className={`${handles.formStepContent} ${handles.formStepContentTwo} flex flex-column w-100 h-100 items-stretch justify-center`}
    >
      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="cep"
          label="CEP"
          placeholder="Digite o CEP"
          error={errors?.cep && touched?.cep}
          success={!errors?.cep && touched?.cep}
          mask="99999-999"
          required
        />

        <FormInput
          field="endereco"
          label="Endereço"
          placeholder="Digite o endereço"
          error={errors?.endereco && touched?.endereco}
          success={!errors?.endereco && touched?.endereco}
          required
        />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="numero"
          label="Número"
          placeholder="Digite o número do endereço"
          error={errors?.numero && touched?.numero}
          success={!errors?.numero && touched?.numero}
          required
        />

        <FormInput
          field="complemento"
          label="Complemento"
          placeholder="Digite o complemento"
          error={errors?.complemento && touched?.complemento}
          success={!errors?.complemento && touched?.complemento}
        />
      </div>

      <div
        className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
      >
        <FormInput
          field="bairro"
          label="Bairro"
          placeholder="Digite o bairro"
          error={errors?.bairro && touched?.bairro}
          success={!errors?.bairro && touched?.bairro}
          required
        />

        <FormInput
          field="cidade"
          label="Cidade"
          placeholder="Digite a cidade"
          error={errors?.cidade && touched?.cidade}
          success={!errors?.cidade && touched?.cidade}
          required
        />
      </div>

      <FormInput
        field="estado"
        label="Estado"
        error={errors?.estado && touched?.estado}
        success={!errors?.estado && touched?.estado}
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

export default FormStepContentTwo
