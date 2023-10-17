/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useRuntime } from 'vtex.render-runtime'

import FormStep from '../FormStep'
import Loading from '../Loading'
import useSubmitForm from '../../hooks/useSubmitForm'
import usePublicSchema from '../../hooks/usePublicSchema'
import useValidationSchema from '../../hooks/useValidationSchema'
import { DEBUG_MODE } from '../../utils/utils'

type B2BFormProps = {
  entity?: string
  schema?: string
}

const CSS_HANDLES = ['container', 'form'] as const

const B2BForm: StorefrontFunctionComponent<B2BFormProps> = ({
  entity = 'CL',
  schema = 'al-form',
}) => {
  const runmtime = useRuntime()

  console.log('🚀 ~ file: index.tsx:26 ~ runmtime:', runmtime)
  const { handles } = useCssHandles(CSS_HANDLES)

  const [isBusiness, setIsBusiness] = useState(false)
  const [step, setStep] = useState(1)

  const { schemaStatus, schemaData } = usePublicSchema(entity, schema)
  const validationSchema = useValidationSchema(schemaData, true)

  console.log('🚀 ~ file: index.tsx:31 ~ validationSchema:', validationSchema)
  const submitMasterData = useSubmitForm()

  if (schemaStatus === 'error' || schemaStatus === 'loading' || !schemaData) {
    return <Loading />
  }

  const nextStep = () => {
    setStep((state) => (state += 1))
  }

  const handleSubmit = (values: any) => {
    // same shape as initial values
    // console.log('SUBMIT!')

    if (!values) {
      return
    }

    submitMasterData(values)
  }

  return (
    <div className={`${handles.container} w-100 h-100`}>
      <Formik
        initialValues={{}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
        validateOnBlur
        isInitialValid={false}
      >
        {({
          isSubmitting,
          isValid,
          isValidating,
          errors,
          values,
          touched,
          setFieldValue,
          validateForm,
        }) => (
          <Form className={`${handles.form} w-100 h-100`}>
            <FormStep
              step={1}
              title="Dados Gerais"
              isSelected={step >= 1}
              nextStep={nextStep}
              errors={errors}
              touched={touched}
              values={values}
              isBusiness={isBusiness}
              setIsBusiness={setIsBusiness}
              validateForm={validateForm}
            />

            <FormStep
              step={2}
              title="Endereço de entrega"
              isSelected={step >= 2}
              nextStep={nextStep}
              errors={errors}
              touched={touched}
              values={values}
              isBusiness={isBusiness}
              setIsBusiness={setIsBusiness}
            />

            {isBusiness && (
              <FormStep
                step={3}
                title="Endereço da Empresa"
                isSelected={step >= 3}
                nextStep={nextStep}
                errors={errors}
                touched={touched}
                values={values}
                isBusiness={isBusiness}
                setIsBusiness={setIsBusiness}
                setFieldValue={setFieldValue}
                validateForm={validateForm}
              />
            )}

            <FormStep
              step={isBusiness ? 4 : 3}
              title="Informações adicionais"
              isSelected={isBusiness ? step >= 4 : step >= 3}
              nextStep={nextStep}
              errors={errors}
              touched={touched}
              values={values}
              isBusiness={isBusiness}
              setIsBusiness={setIsBusiness}
            />

            {DEBUG_MODE && (
              <>
                <div className="c-error overflow-hidden">
                  Erros: {JSON.stringify(errors)}
                </div>
                <div className="c-success overflow-hidden">
                  Values: {JSON.stringify(values)}
                </div>
                <div className="c-success overflow-hidden">
                  isSubmitting: {`${isSubmitting}`}
                </div>
                <div className="c-success overflow-hidden">
                  isValid: {`${isValid}`}
                </div>
                <div className="c-success overflow-hidden">
                  isValidating: {`${isValidating}`}
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

B2BForm.schema = {
  title: 'Formulário de Cadastro',
  type: 'object',
  properties: {
    entity: {
      title: 'Entidade',
      type: 'string',
      default: 'CL',
    },
    schema: {
      title: 'Schema',
      type: 'string',
      default: 'al-form',
    },
    sendToCLEntity: {
      title: 'Enviar para entidade "Cliente"',
      type: 'boolean',
      default: true,
    },
  },
}

export default B2BForm
