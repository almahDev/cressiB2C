/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import FormStepContentFour from '../FormStepContentFour'
import FormStepContentOne from '../FormStepContentOne'
import FormStepContentThree from '../FormStepContentThree'
import FormStepContentTwo from '../FormStepContentTwo'
import FormStepRadio from '../FormStepRadio'

export const CSS_HANDLES = [
  'formStep',
  'formStepRow',
  'formStepColumn',
  'formStepSelected',
  'formStepAnchor',
  'formStepTitle',
  'formStepNumber',
  'formStepContent',
  'formStepContentOne',
  'formStepContentTwo',
  'formStepContentThree',
  'formStepContentTFour',
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
  step: number
  title?: string
  isSelected?: boolean
  nextStep: () => void
  isBusiness?: boolean
  setIsBusiness: React.Dispatch<boolean>
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
  validateForm?: any
  errors: any
  touched: any
  values: any
}

export type FormStepContentProps = {
  errors: any
  touched: any
  values: any
  isBusiness?: boolean
  nextStep: () => void
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
  validateForm?: any
}

const FormStep = ({
  step,
  title,
  isSelected,
  nextStep,
  errors,
  touched,
  values,
  isBusiness,
  setIsBusiness,
  setFieldValue,
  validateForm,
}: FormStepProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={`${handles.formStep} ${handles.formStep}--${step} ${
        isSelected ? `${handles.formStepSelected}` : ''
      }`}
    >
      <div id={`step-${step}`} className={`${handles.formStepAnchor}`} />

      <div
        className={`${handles.formStepTitle} flex items-center justify-start`}
      >
        <span
          className={`${handles.formStepNumber} flex items-center justify-center mr5`}
        >
          {step}
        </span>{' '}
        {title}
      </div>

      {isSelected && step === 1 && (
        <FormStepRadio isBusiness={isBusiness} setIsBusiness={setIsBusiness} />
      )}

      {isSelected &&
        (step === 1 ? (
          <FormStepContentOne
            errors={errors}
            touched={touched}
            values={values}
            isBusiness={isBusiness}
            nextStep={nextStep}
            validateForm={validateForm}
          />
        ) : step === 2 ? (
          <FormStepContentTwo
            errors={errors}
            touched={touched}
            values={values}
            nextStep={nextStep}
          />
        ) : step === 3 ? (
          isBusiness ? (
            <FormStepContentThree
              errors={errors}
              touched={touched}
              values={values}
              nextStep={nextStep}
              setFieldValue={setFieldValue}
              validateForm={validateForm}
            />
          ) : (
            <FormStepContentFour
              errors={errors}
              touched={touched}
              values={values}
              nextStep={nextStep}
            />
          )
        ) : (
          step === 4 &&
          isBusiness && (
            <FormStepContentFour
              errors={errors}
              touched={touched}
              values={values}
              nextStep={nextStep}
            />
          )
        ))}
    </div>
  )
}

export default FormStep
