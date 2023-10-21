import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import { CSS_HANDLES } from '../FormStep'

const FormStepRequiredText = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles.formStepRequiredText} w-100 pb6`}>
      <span className={handles.formStepRequiredAsterisk}>*</span>
      <FormattedMessage id="store/b2b-form.required-fields-text" />
    </div>
  )
}

export default FormStepRequiredText
