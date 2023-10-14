import type { Seller } from 'vtex.product-context/react/ProductTypes'

/**
 * Parses the variation name and returns the second element after splitting by ' - '.
 * @param variationName - The variation name to be parsed.
 * @returns The second element after splitting the variation name by ' - '.
 */
export const parseVariationName = (variationName?: string) => {
  return variationName?.replace(' - ', '#####')?.split('#####')?.[1]
}

/**
 * Parses the variations and returns a string with the values.
 * @param variations - The variations to be parsed.
 * @returns A string with the values of the variations.
 */
export const parseVariations = (
  variations?: Array<{
    name: string
    values: string[]
  }>
) => {
  if (!variations || !variations.length) {
    return []
  }

  return variations
    ?.map((variation) => {
      return `${variation.values.join("', '")}`
    }, '')
    ?.join(' - ')
}

/**
 * Returns the default seller from an array of sellers.
 * @param sellers - An array of sellers.
 * @returns The default seller, or the first seller if there is no default.
 */
export function getDefaultSeller(sellers?: Seller[]) {
  if (!sellers || sellers.length === 0) {
    return
  }

  const defaultSeller = sellers.find((seller) => seller.sellerDefault)

  if (defaultSeller) {
    return defaultSeller
  }

  return sellers[0]
}
