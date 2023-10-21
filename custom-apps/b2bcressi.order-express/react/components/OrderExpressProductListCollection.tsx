/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
  DisclosureLayout,
  DisclosureTrigger,
  DisclosureContent,
  DisclosureLayoutGroup,
  DisclosureStateIndicator,
} from '@vtex/disclosure'
import type { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import styles from '../styles.css'
import IconShow from '../icons/IconShow'
import IconHide from '../icons/IconHide'
import DisclosureStateTrigger from './DisclosureStateTrigger'
import OrderExpressProductListContent from './OrderExpressProductListContent'
// import Loading from './Loading/Loading'

interface OrderExpressProductListCollectionProps {
  collectionId?: string | undefined
  collectionName?: any
  products?: MaybeProduct[]
}

const OrderExpressProductListCollection = ({
  collectionName,
  products,
}: OrderExpressProductListCollectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!products || !products?.length) {
    return <></>
  }

  return (
    <div className={`${styles.productListContent} w-100 flex flex-column`}>
      <DisclosureLayoutGroup>
        <DisclosureLayout>
          <DisclosureTrigger
            htmlProps={{
              className: `${styles.accordionTrigger} ${
                isExpanded
                  ? `${styles.accordionTrigger}--visible`
                  : `${styles.accordionTrigger}--hidden`
              }`,
            }}
          >
            <h2 className={`${styles.productListTitle} t-heading-2`}>
              {collectionName}
            </h2>

            <div className={`${styles.accordionStateIndicator} flex`}>
              <DisclosureStateIndicator
                show={<IconShow />}
                hide={<IconHide />}
              />
            </div>
          </DisclosureTrigger>

          <DisclosureContent
            htmlProps={{
              className: `${styles.accordionContent} ${
                isExpanded
                  ? `${styles.accordionContent}--visible`
                  : `${styles.accordionContent}--hidden`
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
