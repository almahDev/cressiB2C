/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSONSchemaType } from 'react-hook-form-jsonschema'
import * as Yup from 'yup'

import { parseDateString, validateCnpj, validateCpf } from '../utils/validation'

const useValidationSchema = (
  schemaData: JSONSchemaType | null,
  isBusiness: boolean
) => {
  // console.log('SignupSchema')
  // console.log('schemaData', schemaData)

  if (!schemaData || !schemaData?.properties || !schemaData?.required) {
    return
  }

  // VALIDAÇÃO CPF
  Yup.addMethod(Yup.string, 'cpf', function validateCpfFunc(message) {
    return this.test({
      name: 'cpf',
      exclusive: true,
      message,
      test: (value) => {
        if (!value || !value?.length) {
          return false
        }

        const cleanValue = value?.replace(/[./-]/g, '')

        return validateCpf(cleanValue)
      },
    })
  })

  // VALIDAÇÃO CNPJ
  Yup.addMethod(Yup.string, 'cnpj', function validateCnpjFunc(message) {
    return this.test({
      name: 'cnpj',
      exclusive: true,
      message,
      test: (value) => {
        if (!value || !value?.length) {
          return false
        }

        const cleanValue = value?.replace(/[./-]/g, '')

        return validateCnpj(cleanValue)
      },
    })
  })

  let currentSchema = Yup.object()
  // const requiredFields = schemaData?.required
  const propertiesFields = schemaData?.properties
  const currentShape: any = {}

  for (const propertyName in propertiesFields) {
    const propertyValue = propertiesFields[propertyName]
    const { type } = propertyValue

    switch (type) {
      case 'number':
        currentShape[propertyName] = Yup.number()

        break

      case 'string':
        currentShape[propertyName] = Yup.string()

        break

      case 'boolean':
        currentShape[propertyName] = Yup.boolean()

        break

      default:
        currentShape[propertyName] = Yup.mixed()

        break
    }

    switch (propertyName) {
      // DADOS PESSOAIS
      case 'email':
        currentShape[propertyName] = currentShape[propertyName]
          .email(`E-mail inválido`)
          .required('Preencha o e-mail')
        break

      case 'nome':
        if (!isBusiness) {
          currentShape[propertyName] = currentShape[propertyName].required(
            'Preencha o seu nome'
          )
        }

        break

      case 'sobrenome':
        if (!isBusiness) {
          currentShape[propertyName] = currentShape[propertyName].required(
            'Preencha o seu sobrenome'
          )
        }

        break

      case 'cpf':
        if (!isBusiness) {
          currentShape[propertyName] = currentShape[propertyName]
            .required('Preencha o CPF')
            .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
              excludeEmptyString: true,
              message: 'CPF inválido',
            })
            .cpf('CPF inválido')
        }

        break

      case 'genero':
        if (!isBusiness) {
          currentShape[propertyName] = currentShape[propertyName].required(
            'Selecione uma opção'
          )
        }

        break

      case 'data_nascimento':
        if (!isBusiness) {
          currentShape[propertyName] = Yup.date()
            .transform(parseDateString)
            .max(new Date())
            .typeError('Data de abertura inválida')
            .required('Preencha a data de nascimento')
        }

        break

      case 'telefone':
        currentShape[propertyName] = currentShape[propertyName]
          .required('Preencha o telefone')
          .matches(/^\([0-9]{2}\)\s[0-9]{4,5}-[0-9]{4}$/, {
            excludeEmptyString: true,
            message: 'Telefone inválido',
          })
        break

      // DADOS JURÍDICOS
      case 'razao_social':
        if (isBusiness) {
          currentShape[propertyName] = currentShape[propertyName].required(
            'Preencha a razão social'
          )
        }

        break

      case 'nome_fantasia':
        if (isBusiness) {
          currentShape[propertyName] = currentShape[propertyName].required(
            'Preencha o nome fantasia'
          )
        }

        break

      case 'cnpj':
        if (isBusiness) {
          currentShape[propertyName] = currentShape[propertyName]
            .required('Preencha o CNPJ')
            .matches(/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/, {
              excludeEmptyString: true,
              message: 'CNPJ inválido',
            })
            .cnpj('CNPJ inválido')
        }

        break

      case 'ie':
        if (isBusiness) {
          currentShape[propertyName] = currentShape[propertyName].required(
            'Preencha a inscrição estadual'
          )
        }

        break

      case 'data_abertura':
        if (isBusiness) {
          currentShape[propertyName] = Yup.date()
            .transform(parseDateString)
            .max(new Date())
            .typeError('Data de abertura inválida')
            .required('Preencha a data de abertura')
        }

        break

      case 'celular':
        if (isBusiness) {
          currentShape[propertyName] = currentShape[propertyName]
            .required('Preencha o telefone')
            .matches(/^\([0-9]{2}\)\s9[0-9]{4}-[0-9]{4}$/, {
              excludeEmptyString: true,
              message: 'Celular inválido',
            })
        }

        break

      // ENDEREÇO DE ENTREGA
      case 'cep':
        currentShape[propertyName] = currentShape[propertyName]
          .required('Preencha o CEP')
          .matches(/^[0-9]{5}-[0-9]{3}$/, {
            excludeEmptyString: true,
            message: 'CEP inválido',
          })

        break

      case 'endereco':
        currentShape[propertyName] = currentShape[propertyName].required(
          'Preencha o endereço'
        )
        break

      case 'numero':
        currentShape[propertyName] =
          currentShape[propertyName].required('Preencha o número')
        break

      case 'bairro':
        currentShape[propertyName] =
          currentShape[propertyName].required('Preencha o bairro')
        break

      case 'cidade':
        currentShape[propertyName] =
          currentShape[propertyName].required('Preencha a cidade')
        break

      case 'estado':
        currentShape[propertyName] = currentShape[propertyName].required(
          'Selecione uma opção'
        )
        break

      // ENDEREÇO DA EMPRESA
      case 'emp_cep':
        if (isBusiness) {
          currentShape[propertyName] = currentShape[propertyName]
            .required('Preencha o CEP')
            .matches(/^[0-9]{5}-[0-9]{3}$/, {
              excludeEmptyString: true,
              message: 'CEP inválido',
            })
        }

        break

      case 'emp_endereco':
        if (isBusiness) {
          currentShape[propertyName] = currentShape[propertyName].required(
            'Preencha o endereço'
          )
        }

        break

      case 'emp_numero':
        if (isBusiness) {
          currentShape[propertyName] =
            currentShape[propertyName].required('Preencha o número')
        }

        break

      case 'emp_bairro':
        if (isBusiness) {
          currentShape[propertyName] =
            currentShape[propertyName].required('Preencha o bairro')
        }

        break

      case 'emp_cidade':
        if (isBusiness) {
          currentShape[propertyName] =
            currentShape[propertyName].required('Preencha a cidade')
        }

        break

      case 'emp_estado':
        if (isBusiness) {
          currentShape[propertyName] = currentShape[propertyName].required(
            'Selecione uma opção'
          )
        }

        break

      default:
        break
    }
  }

  // console.log('currentShape', currentShape)

  currentSchema = currentSchema.shape(currentShape)

  return currentSchema
}

export default useValidationSchema
