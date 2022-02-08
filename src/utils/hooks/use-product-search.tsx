import { useEffect, useState, useMemo } from "react"
import * as queryString from "query-string"
import { useQuery } from "urql"

export const ProductsQuery = /* GraphQL */ `
  query SearchProducts($input: SearchInput!) {
    search(input: $input) {
      items {
        productId
        slug
        productName
        description
        currencyCode
        priceWithTax {
          ... on PriceRange {
            min
            max
          }
        }
        productAsset {
          id
          preview
          focalPoint {
            x
            y
          }
        }
      }
      totalItems
      facetValues {
        count
        facetValue {
          id
          name
          facet {
            id
            name
          }
        }
      }
    }
  }
`

export interface SearchInput {
  facetValueIds?: string[]
  collectionSlug?: string
  skip?: number
  take?: number
  term?: string
}

export function useProductSearch({
  term,
  collectionSlug,
}: {
  term?: string
  collectionSlug?: string
}) {
  const skip = 0
  const take = 20
  const [query, setQuery] = useState(term)
  const [initialRender, setInitialRender] = useState(true)

  const [result] = useQuery({
    query: ProductsQuery,
    variables: {
      input: {
        groupByProduct: true,
        collectionSlug,
        skip,
        take,
        term,
      },
    },
  })

  // useEffect(() => {
  //   const qs = queryString.stringify({
  //     // Don't show if falsy
  //     q: term || undefined,
  //   })
  //
  //   console.log({ term });
  //
  //   const url = new URL(window.location.href)
  //   url.search = qs
  //   url.hash = ""
  //   window.history.replaceState({}, null, url.toString())
  //   // setQuery(query)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // })

  const fetchPreviousPage = () => {
    // when we go back we want all products before the first one of our array
    const previousCursor = result.data.products.edges[0].cursor
  }
  const fetchNextPage = () => {
    // when we go forward we want all products after the first one of our array
    const prods = result.data.products
    const nextCursor = prods.edges[prods.edges.length - 1].cursor
  }

  let hasPreviousPage
  let hasNextPage

  const products = useMemo(() => {
    if (result.data && initialRender) setInitialRender(false)
    return result.data?.search?.items || []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, result.data])

  if (result && result.data) {
    hasPreviousPage = 0 < skip
    hasNextPage = skip + take < result.data.search.totalItems
  }

  const isFetching = !initialRender && result.fetching

  return {
    isFetching,
    hasPreviousPage,
    hasNextPage,
    products,
    fetchNextPage,
    fetchPreviousPage,
  }
}
