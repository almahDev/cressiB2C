import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { useFormikContext } from 'formik'
import { Spinner } from 'vtex.styleguide'

import type { FormStepContentProps } from '../FormStep'
import { CSS_HANDLES } from '../FormStep'
import FormInput from '../FormInput'
import IconCheckbox from '../../icons/IconCheckbox'
import IconCheckboxSelected from '../../icons/IconCheckboxSelected'
import IconPlus from '../../icons/IconPlus'

const FormStepContentFour = ({ errors, touched }: FormStepContentProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [noMoreInfo, setNoMoreInfo] = useState(false)
  const [currentInfoNumber, setCurrentInfoNumber] = useState(1)
  const [loading, setLoading] = useState(false)
  const { setFieldValue } = useFormikContext()

  const toggleNoMoreInfo = () => {
    setNoMoreInfo((state) => !state)
  }

  const addInfoNumber = () => {
    setCurrentInfoNumber((state) => (state += 1))
  }

  const handleClick = () => {
    setLoading(true)
  }

  useEffect(() => {
    if (!noMoreInfo) {
      return
    }

    setFieldValue('ref_1_nome', '')
    setFieldValue('ref_1_endereco', '')
    setFieldValue('ref_1_telefone', '')

    setFieldValue('ref_2_nome', '')
    setFieldValue('ref_2_endereco', '')
    setFieldValue('ref_2_telefone', '')

    setFieldValue('ref_3_nome', '')
    setFieldValue('ref_3_endereco', '')
    setFieldValue('ref_3_telefone', '')

    setCurrentInfoNumber(1)
  }, [noMoreInfo])

  return (
    <div
      className={`${handles.formStepContent} flex flex-column w-100 h-100 items-stretch justify-center`}
    >
      <div
        className={`${handles.formInfoBlock} w-100 flex items-center justify-start pb7 c-on-base t-small pointer`}
        onClick={toggleNoMoreInfo}
        role="presentation"
      >
        <span className={`${handles.formInfoIcon} flex pr3`}>
          {noMoreInfo ? <IconCheckboxSelected /> : <IconCheckbox />}
        </span>{' '}
        <FormattedMessage id="store/b2b-form.no-more-info-text" />
      </div>

      {!noMoreInfo && (
        <>
          {/* REFERÊNCIA 1 */}
          <FormInput
            field="ref_1_nome"
            label="Nome da empresa"
            placeholder="Digite o nome da empresa"
            error={errors?.ref_1_nome}
            success={!errors?.ref_1_nome && touched?.ref_1_nome}
          />

          <div
            className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
          >
            <FormInput
              field="ref_1_endereco"
              label="Endereço"
              placeholder="Digite o endereço da empresa"
              error={errors?.ref_1_endereco}
              success={!errors?.ref_1_endereco && touched?.ref_1_endereco}
            />

            <FormInput
              field="ref_1_telefone"
              label="Telefone"
              placeholder="Digite o telefone da empresa"
              error={errors?.ref_1_telefone}
              success={!errors?.ref_1_telefone && touched?.ref_1_telefone}
              mask="(99) 99999-9999"
            />
          </div>

          {/* REFERÊNCIA 2 */}
          {currentInfoNumber >= 2 && (
            <>
              <FormInput
                field="ref_2_nome"
                label="Nome da empresa"
                placeholder="Digite o nome da empresa"
                error={errors?.ref_2_nome}
                success={!errors?.ref_2_nome && touched?.ref_2_nome}
              />

              <div
                className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
              >
                <FormInput
                  field="ref_2_endereco"
                  label="Endereço"
                  placeholder="Digite o endereço da empresa"
                  error={errors?.ref_2_endereco}
                  success={!errors?.ref_2_endereco && touched?.ref_2_endereco}
                />

                <FormInput
                  field="ref_2_telefone"
                  label="Telefone"
                  placeholder="Digite o telefone da empresa"
                  error={errors?.ref_2_telefone}
                  success={!errors?.ref_2_telefone && touched?.ref_2_telefone}
                  mask="(99) 99999-9999"
                />
              </div>
            </>
          )}

          {/* REFERÊNCIA 3 */}
          {currentInfoNumber >= 3 && (
            <>
              <FormInput
                field="ref_3_nome"
                label="Nome da empresa"
                placeholder="Digite o nome da empresa"
                error={errors?.ref_3_nome}
                success={!errors?.ref_3_nome && touched?.ref_3_nome}
              />

              <div
                className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
              >
                <FormInput
                  field="ref_3_endereco"
                  label="Endereço"
                  placeholder="Digite o endereço da empresa"
                  error={errors?.ref_3_endereco}
                  success={!errors?.ref_3_endereco && touched?.ref_3_endereco}
                />

                <FormInput
                  field="ref_3_telefone"
                  label="Telefone"
                  placeholder="Digite o telefone da empresa"
                  error={errors?.ref_3_telefone}
                  success={!errors?.ref_3_telefone && touched?.ref_3_telefone}
                  mask="(99) 99999-9999"
                />
              </div>
            </>
          )}

          {currentInfoNumber < 3 && (
            <div
              className={`${handles.formAddMoreInfoBlock} w-100 flex items-center justify-start mb6 c-on-base t-small pointer`}
              onClick={addInfoNumber}
              role="presentation"
            >
              <span className={`${handles.formAddMoreInfoIcon} flex pr3`}>
                <IconPlus />
              </span>{' '}
              <FormattedMessage id="store/b2b-form.add-more-info-text" />
            </div>
          )}
        </>
      )}

      <button
        className={`${handles.formStepSubmitButton}  ${
          loading ? `${handles.formStepButtonLoading}` : ''
        } flex items-center justify-center pointer bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer`}
        onClick={handleClick}
        type="submit"
      >
        {loading ? (
          <Spinner color="currentColor" size="20" />
        ) : (
          <FormattedMessage id="store/b2b-form.submit-button-text" />
        )}
      </button>
    </div>
  )
}

export default FormStepContentFour
