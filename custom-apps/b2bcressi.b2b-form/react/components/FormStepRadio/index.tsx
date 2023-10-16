/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormikContext } from 'formik'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import IconRadio from '../../icons/IconRadio'
import IconRadioEmpty from '../../icons/IconRadioEmpty'

const CSS_HANDLES = [
  'formRadioContainer',
  'formRadioLabel',
  'formRadioContent',
  'formRadioIcon',
  'formRadioOption',
] as const

type FormStepRadioProps = {
  isBusiness?: boolean
  setIsBusiness: React.Dispatch<boolean>
}

const FormStepRadio = ({
  isBusiness = false,
  setIsBusiness,
}: FormStepRadioProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { validateForm } = useFormikContext()

  const handleClickPF = () => {
    setIsBusiness(false)
    // setTouched({})
    validateForm()

    setTimeout(() => {
      validateForm()
    }, 500)
  }

  const handleClickPJ = () => {
    setIsBusiness(true)
    // setErrors({})

    validateForm()

    setTimeout(() => {
      validateForm()
    }, 500)
  }

  return (
    <div
      className={`${handles.formRadioContainer}  w-100 flex flex-column items-start justify-center pb3 pt7`}
    >
      <div className={`${handles.formRadioLabel} w-100 c-on-base t-small pb5`}>
        <FormattedMessage id="store/b2b-form.radio-text" />
      </div>

      <div
        className={`${handles.formRadioContent}  w-100 flex items-center justify-start`}
      >
        <div
          className={`${handles.formRadioOption} flex items-center justify-start c-on-muted-3 t-small pr7 pointer`}
          onClick={handleClickPF}
          role="presentation"
        >
          <span className={`${handles.formRadioIcon} flex pr3`}>
            {!isBusiness ? <IconRadio /> : <IconRadioEmpty />}
          </span>{' '}
          <FormattedMessage id="store/b2b-form.legal-person-text" />
        </div>

        <div
          className={`${handles.formRadioOption} flex items-center justify-start c-on-muted-3 t-small pointer`}
          onClick={handleClickPJ}
          role="presentation"
        >
          <span className={`${handles.formRadioIcon} flex pr3`}>
            {isBusiness ? <IconRadio /> : <IconRadioEmpty />}
          </span>{' '}
          <FormattedMessage id="store/b2b-form.juridical-person-text" />
        </div>
      </div>
    </div>
  )
}

export default FormStepRadio
