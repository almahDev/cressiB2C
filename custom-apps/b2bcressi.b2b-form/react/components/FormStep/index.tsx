/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import FormStepContent from '../FormStepContent'

export const CSS_HANDLES = [
  'formStep',
  'formStepRow',
  'formStepColumn',
  'formStepSelected',
  'formStepAnchor',
  'formStepTitle',
  'formStepNumber',
  'formStepContent',
  'formStepContentPJ',
  'formStepContentPF',
  'formStepButtonDisabled',
  'formStepButtonLoading',
  'formStepNextButton',
  'formStepSubmitButton',
  'formStepRequiredText',
  'formStepRequiredAsterisk',
  'formStepSpacer',
  'formInfoBlock',
  'formInfoSelected',
  'formInfoIcon',
  'formInfoText',
  'formAddMoreInfoBlock',
  'formAddMoreInfoSelected',
  'formAddMoreInfoIcon',
  'formAddMoreInfoText',
  'formBusinessShippingBlock',
  'formBusinessShippingSelected',
  'formBusinessShippingIcon',
  'formBusinessShippingText',
  'formError',
] as const

type FormStepProps = {
  validateForm?: any
  errors: any
  touched: any
  values: any
  clientType: string
}

export type FormStepContentProps = {
  errors: any
  touched: any
  values: any
  validateForm?: any
}

const FormStep = ({
  errors,
  touched,
  values,
  validateForm,
  clientType,
}: FormStepProps) => {
  console.log('🚀 ~ file: index.tsx:85 ~ clientType:', clientType)
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles.formStep}`}>
      <div
        className={`${handles.formStepTitle} flex items-center justify-start`}
      >
        SEUS DADOS
      </div>

      <FormStepContent
        errors={errors}
        touched={touched}
        values={values}
        validateForm={validateForm}
      />
    </div>
  )
}

export default FormStep
