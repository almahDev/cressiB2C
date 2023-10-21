import React, { useContext } from 'react'
import { useQuery } from 'react-apollo'

import type { CollectionProps } from './OrderExpress'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'
import OrderExpressProductListCollection from './OrderExpressProductListCollection'
import ProductSearchQuery from '../graphql/productSearch.gql'
import styles from '../styles.css'
import Loading from './Loading/Loading'
import { OrderExpressContext } from '../contexts/OrderExpressContext'

interface OrderExpressProductListProps {
  collections?: CollectionProps[]
  hideUnavailableItems?: boolean
}

const OrderExpressProductList = ({
  collections,
  hideUnavailableItems,
}: OrderExpressProductListProps) => {
  const { searchValue } = useContext(OrderExpressContext)

  const selectedFacets = collections?.map((collection) => ({
    key: 'productClusterIds',
    value: collection?.collectionId,
  }))

  const { data, loading, error } = useQuery(ProductSearchQuery, {
    ssr: false,
    notifyOnNetworkStatusChange: true,
    variables: {
      selectedFacets,
      hideUnavailableItems,
    },
  })

  if (loading || error || !data) {
    return <Loading height="72px" count={collections?.length ?? 1} />
  }

  const {
    productSearch: { products },
  } = data ?? {}

  if (!products || !products?.length) {
    return <Loading height="72px" count={collections?.length ?? 1} />
  }

  const productFilteredIfUnavailable: MaybeProduct[] = hideUnavailableItems
    ? products?.map((product: MaybeProduct) => ({
        ...product,
        items: product?.items?.filter((item) => {
          const { sellers } = item

          const isAvailable = sellers?.some(
            (seller) => seller.commertialOffer.AvailableQuantity > 0
          )

          return Boolean(isAvailable)
        }),
      }))
    : products

  const productsSearched = productFilteredIfUnavailable?.filter((product) =>
    product?.productName?.toLowerCase()?.includes(searchValue?.toLowerCase())
  )

  const productsFiltered = collections?.map((collection) => ({
    collectionId: collection?.collectionId,
    collectionName: productsSearched?.find((product) =>
      product?.productClusters?.find(
        (productCluster) => productCluster?.id === collection?.collectionId
      )
    )?.productClusters?.[0]?.name,
    products: productsSearched?.filter((product) =>
      product?.productClusters?.find(
        (productCluster) => productCluster?.id === collection?.collectionId
      )
    ),
  }))

  if (!productsFiltered || !productsFiltered?.length) {
    return <></>
  }

  return (
    <div className={`${styles.productListContainer} w-100 flex flex-column`}>
      {productsFiltered?.map((productCollection) => (
        <OrderExpressProductListCollection
          key={`collection-${productCollection?.collectionId}`}
          {...productCollection}
        />
      ))}
      <div className={`${styles.productListEmpty} dn t-body`}>
        Nenhum resultado encontrado.
      </div>
    </div>
  )
}

export default OrderExpressProductList
