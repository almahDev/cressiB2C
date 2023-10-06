/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
  DisclosureLayout,
  DisclosureTrigger,
  DisclosureContent,
  DisclosureLayoutGroup,
  DisclosureStateIndicator,
} from '@vtex/disclosure'
import { Loading } from 'vtex.render-runtime'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'
import IconShow from '../icons/IconShow'
import IconHide from '../icons/IconHide'
import DisclosureStateTrigger from './DisclosureStateTrigger'
import OrderExpressProductListContent from './OrderExpressProductListContent'

interface OrderExpressProductListCollectionProps {
  collectionId?: string | undefined
  collectionName?: any
  products?: MaybeProduct[]
}

const OrderExpressProductListCollection = ({
  collectionName,
  products,
}: OrderExpressProductListCollectionProps) => {
  console.log(
    '🚀 ~ file: OrderExpressProductListCollection.tsx:17 ~ collectionName:',
    collectionName
  )
  console.log(
    '🚀 ~ file: OrderExpressProductListCollection.tsx:13 ~ products:',
    products
  )

  const [isExpanded, setIsExpanded] = useState(false)
  console.log(
    '🚀 ~ file: OrderExpressProductListCollection.tsx:35 ~ setIsExpanded:',
    setIsExpanded
  )
  console.log(
    '🚀 ~ file: OrderExpressProductListCollection.tsx:35 ~ isExpanded:',
    isExpanded
  )

  if (!products || !products?.length) {
    return (
      <>
        <Loading />
      </>
    )
  }

  // const collectionNames = products?.find(
  //   (product: any) => product?.productClusters?.[0]?.name
  // )
  // console.log(
  //   '🚀 ~ file: OrderExpressProductListCollection.tsx:21 ~ collectionNames:',
  //   collectionNames
  // )

  return (
    <div
      className={`${styles.orderExpressProductListContent} w-100 flex flex-column`}
    >
      <DisclosureLayoutGroup>
        <DisclosureLayout>
          <DisclosureTrigger
            htmlProps={{
              className: `${styles.orderExpressAccordionTrigger} ${
                isExpanded
                  ? `${styles.orderExpressAccordionTrigger}--visible`
                  : `${styles.orderExpressAccordionTrigger}--hidden`
              }`,
            }}
          >
            <h2
              className={`${styles.orderExpressProductListTitle} t-heading-2`}
            >
              {collectionName}
            </h2>

            <div
              className={`${styles.orderExpressAccordionStateIndicator} flex`}
            >
              <DisclosureStateIndicator
                show={<IconShow />}
                hide={<IconHide />}
              />
            </div>
          </DisclosureTrigger>

          <DisclosureContent
            htmlProps={{
              className: `${styles.orderExpressAccordionContent} ${
                isExpanded
                  ? `${styles.orderExpressAccordionContent}--visible`
                  : `${styles.orderExpressAccordionContent}--hidden`
              }`,
            }}
          >
            <OrderExpressProductListContent products={products} />
          </DisclosureContent>

          <DisclosureStateTrigger setIsExpanded={setIsExpanded} />
        </DisclosureLayout>
      </DisclosureLayoutGroup>
    </div>
  )
}

export default OrderExpressProductListCollection
