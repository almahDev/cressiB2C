import React from 'react'
import { useQuery } from 'react-apollo'

import ProductSearchQuery from '../graphql/productSearch.gql'

const OrderExpressProductList = () => {
  const { data, loading, error } = useQuery(ProductSearchQuery, {
    ssr: false,
    notifyOnNetworkStatusChange: true,
    variables: {
      selectedFacets: [
        { key: 'productClusterIds', value: '137' },
        { key: 'productClusterIds', value: '138' },
      ],
    },
  })

  console.log(
    '🚀 ~ file: OrderExpressProductList.tsx:16 ~ OrderExpressProductList ~ error:',
    error
  )
  console.log(
    '🚀 ~ file: OrderExpressProductList.tsx:16 ~ OrderExpressProductList ~ loading:',
    loading
  )
  console.log(
    '🚀 ~ file: OrderExpressProductList.tsx:16 ~ OrderExpressProductList ~ data:',
    data
  )

  if (loading || error || !data) {
    return (
      <>
        loading
        {/* <Skeleton className="mr4" count={2} height={550} width={320} inline /> */}
      </>
    )
  }

  const {
    productSearch: { products },
  } = data ?? {}

  if (!products || !products?.length) {
    return <>loading</>
  }

  console.log(
    '🚀 ~ file: OrderExpressProductList.tsx:34 ~ OrderExpressProductList ~ products:',
    products
  )

  return (
    <div>
      {products?.map((product: any) => (
        <div>
          <img
            src={product?.items[0]?.images[0]?.imageUrl}
            alt={product?.productName}
          />

          <h2>{product?.productName}</h2>
        </div>
      ))}
    </div>
  )
}

export default OrderExpressProductList
