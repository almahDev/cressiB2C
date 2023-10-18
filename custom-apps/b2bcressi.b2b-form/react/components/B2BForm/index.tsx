/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from 'formik'
import React from 'react'
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
  const {
    route: { path },
  } = useRuntime()

  console.log('🚀 ~ file: index.tsx:26 ~ path:', path)
  const clientType = path?.includes('cadastro/lojista')
    ? 'lojista'
    : 'instrutor'

  console.log('🚀 ~ file: index.tsx:31 ~ clientType:', clientType)

  const { handles } = useCssHandles(CSS_HANDLES)

  const { schemaStatus, schemaData } = usePublicSchema(entity, schema)

  console.log('🚀 ~ file: index.tsx:42 ~ schemaData:', schemaData)
  const validationSchema = useValidationSchema(
    schemaData,
    clientType === 'lojista'
  )

  console.log('🚀 ~ file: index.tsx:31 ~ validationSchema:', validationSchema)
  const submitMasterData = useSubmitForm()

  if (schemaStatus === 'error' || schemaStatus === 'loading' || !schemaData) {
    return <Loading />
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
          validateForm,
        }) => (
          <Form className={`${handles.form} w-100 h-100`}>
            <FormStep
              errors={errors}
              touched={touched}
              values={values}
              validateForm={validateForm}
              clientType={clientType}
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
