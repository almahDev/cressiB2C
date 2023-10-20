import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'formCheckboxGroupContainer',
  'formCheckboxGroupLabel',
  'formCheckboxGroupLabelRequired',
  'formCheckbox',
  'formCheckboxChecked',
  'formCheckboxLabel',
  'formCheckboxError',
  'formCheckboxSuccess',
  'formError',
] as const

type FormCheckboxGroupProps = {
  label?: string
  field: string
  values?: string[]
  required?: boolean
  error?: string | boolean
  success?: string | boolean
  originalValues?: string[]
}

const FormCheckboxGroup = ({
  label,
  field,
  values,
  required,
  error,
  success,
  originalValues,
}: FormCheckboxGroupProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={`${handles.formCheckboxGroupContainer} w-100 flex flex-column items-start justify-center`}
    >
      {label && label.length > 0 ? (
        <div className={`${handles.formCheckboxGroupLabel} c-on-base t-small`}>
          {label}
          {required && (
            <span className={handles.formCheckboxGroupLabelRequired}>*</span>
          )}
        </div>
      ) : (
        <></>
      )}

      {values && values?.length > 0 ? (
        values.map((value) => (
          <label
            key={`form-checkbox-group-${field}-${value}`}
            htmlFor={`${field}-${value}`}
            className={`${handles.formCheckboxLabel} w-auto c-on-base t-small flex items-center justify-start`}
          >
            <Field
              className={`${handles.formCheckbox}  ${
                error ? `${handles.formCheckboxError}` : ''
              } ${success ? `${handles.formCheckboxSuccess}` : ''} ${
                originalValues?.includes(value)
                  ? `${handles.formCheckboxChecked}`
                  : ''
              } w-100 ph5 pv4 c-on-base t-small ba b--muted-4 br2 bg-white`}
              id={`${field}-${value}`}
              name={field}
              type="checkbox"
              required={required}
              value={value}
            />

            {value}
          </label>
        ))
      ) : (
        <></>
      )}

      <ErrorMessage
        className={`${handles.formError} w-100 c-danger t-mini pt3`}
        name={field}
        component="div"
      />
    </div>
  )
}

export default FormCheckboxGroup
