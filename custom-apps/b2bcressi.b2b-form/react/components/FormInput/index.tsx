import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import FormMask from '../FormMask'

const CSS_HANDLES = [
  'formInputContainer',
  'formInputLabel',
  'formInputLabelRequired',
  'formInput',
  'formInputError',
  'formInputSuccess',
  'formError',
  'formSelect',
] as const

type FormInputProps = {
  component?: string
  label: string
  field: string
  placeholder?: string
  type?: string
  required?: boolean
  error?: string | boolean
  success?: string | boolean
  children?: React.ReactNode
  mask?: string
}

const FormInput = ({
  component,
  label,
  field,
  placeholder,
  type = 'text',
  required,
  error,
  success,
  children,
  mask,
}: FormInputProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={`${handles.formInputContainer} w-100 flex flex-column items-start justify-center pb7 pr8-ns`}
    >
      <label
        className={`${handles.formInputLabel} w-100 c-on-base t-small pb3`}
        htmlFor={field}
      >
        {label}
        {required && <span className={handles.formInputLabelRequired}>*</span>}
      </label>

      <Field
        className={`${handles.formInput} ${
          error ? `${handles.formInputError}` : ''
        } ${success && !component ? `${handles.formInputSuccess}` : ''} ${
          component === 'select' ? `${handles.formSelect}` : ''
        } w-100 ph5 pv4 c-on-base t-small ba b--muted-4 br2 bg-white`}
        id={field}
        name={field}
        placeholder={placeholder}
        type={type}
        required={required}
        mask={mask}
        component={mask ? FormMask : component}
      >
        {children}
      </Field>

      <ErrorMessage
        className={`${handles.formError} w-100 c-danger t-mini pt3`}
        name={field}
        component="div"
      />
    </div>
  )
}

export default FormInput
