import React from 'react'
import type { FieldProps } from 'formik'
import InputMask from 'react-input-mask'

type FormMaskProps = FieldProps & {
  mask: string
}

const FormMask = ({ mask, field, form, ...props }: FormMaskProps) => {
  return <InputMask mask={mask} {...field} {...props} />
}

export default FormMask
