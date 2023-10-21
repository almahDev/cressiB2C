import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import type { JSONSchemaType } from 'react-hook-form-jsonschema'
// import { useRuntime } from 'vtex.render-runtime'

import documentPublicSchema from '../graphql/getSchema.graphql'
// import { entityProdToDeveloper } from '../utils/utils'

type SchemaStatusType = 'loading' | 'error' | 'success'

const usePublicSchema = (entity: string, schema: string) => {
  // console.log('schema', schema)

  // const { account } = useRuntime()

  // console.log('=== account', account)

  // const dataEntity = entityProdToDeveloper(account, entity)
  const dataEntity = entity

  // console.log('=== dataEntity', dataEntity)

  const [schemaData, setSchemaData] = useState<JSONSchemaType | null>(null)
  const [schemaStatus, setSchemaStatus] = useState<SchemaStatusType>('loading')
  const { data, loading, error } = useQuery(documentPublicSchema, {
    variables: {
      dataEntity,
      schema,
    },
  })

  useEffect(() => {
    // console.log('data', data)
    // console.log('loading', loading)
    // console.log('error', error)

    if (!data || loading || error) {
      return
    }

    if (loading) {
      setSchemaStatus('loading')

      return
    }

    if (error) {
      setSchemaStatus('error')

      return
    }

    const schemaDocument = data?.documentPublicSchema?.schema

    // console.log('schemaDocument', schemaDocument)

    if (!schemaDocument) {
      setSchemaStatus('error')
      console.error('No MasterData Schema found')

      return
    }

    if (!('properties' in schemaDocument)) {
      setSchemaStatus('error')

      console.error(
        `The MasterData Schema fields should be inside "properties". Example: { "schema": { "type": "object", "properties": { "foo": { "type": "string" } }}}`
      )
      console.error('Received:', schemaDocument)

      return
    }

    if (!('type' in schemaDocument)) {
      setSchemaStatus('error')

      console.error(
        `The MasterData Schema is missing the required property \`"type": "object"\`. Example: { "schema": { "type": "object", "properties": { "foo": { "type": "string" } }}}`
      )
      console.error('Received:', schemaDocument)

      return
    }

    setSchemaStatus('success')
    setSchemaData(schemaDocument)
  }, [data, loading, error])

  return {
    schemaStatus,
    schemaData,
  }
}

export default usePublicSchema
