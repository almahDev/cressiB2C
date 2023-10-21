/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormikErrors } from 'formik'

const getFieldErrorNames = (formikErrors: FormikErrors<any>) => {
  const transformObjectToDotNotation = (
    obj: any,
    prefix = '',
    result: string[] = []
  ) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key]

      if (!value) return

      const nextKey = prefix ? `${prefix}.${key}` : key

      if (typeof value === 'object') {
        transformObjectToDotNotation(value, nextKey, result)
      } else {
        result.push(nextKey)
      }
    })

    return result
  }

  return transformObjectToDotNotation(formikErrors)
}

const scrollToFieldError = (isValid: boolean, errors: FormikErrors<any>) => {
  if (isValid) return

  const fieldErrorNames = getFieldErrorNames(errors)

  if (fieldErrorNames.length <= 0) return

  const element = document.querySelector(`input[name='${fieldErrorNames[0]}']`)

  if (!element) return

  // Scroll to first known error into view
  element.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

export default scrollToFieldError
