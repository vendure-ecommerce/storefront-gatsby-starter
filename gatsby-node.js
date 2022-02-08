exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  /**
   * Create collection pages
   */
  const getCollections = await graphql(GET_COLLECTIONS)
  const collections = getCollections.data.vendure.collections.items
  for (const collection of collections) {
    const searchByCollection = await graphql(SEARCH_BY_COLLECTION, {
      input: {
        collectionSlug: collection.slug,
        groupByProduct: true,
      },
    })
    const products = searchByCollection.data.vendure.search.items
    const childCollections = collections.filter(
      c => c.parent.id === collection.id
    )
    createPage({
      path: `/collection/${collection.slug}`,
      component: require.resolve("./src/templates/collection.tsx"),
      context: {
        collection,
        products,
        childCollections,
      },
      defer: false,
    })
  }

  /**
   * Create product pages
   */
  let skip
  let totalItems
  const take = 100
  const productIds = []
  do {
    skip = skip == null ? 0 : skip + take
    const getProductIds = await graphql(GET_PRODUCT_IDS, {
      input: { skip, take },
    })
    totalItems = getProductIds.data.vendure.search.totalItems
    productIds.push(
      ...getProductIds.data.vendure.search.items.map(i => i.productId)
    )
  } while (skip + take < totalItems)
  for (const id of productIds) {
    const getProduct = await graphql(GET_PRODUCT, { id })
    const product = getProduct.data.vendure.product;
    createPage({
      path: `/product/${product.slug}`,
      component: require.resolve("./src/templates/product.tsx"),
      context: {
        product,
      },
      defer: false,
    })
  }
}

const GET_COLLECTIONS = /* GraphQL */ `
  query {
    vendure {
      collections {
        items {
          id
          name
          description
          slug
          breadcrumbs {
            id
            name
            slug
          }
          featuredAsset {
            id
            preview
          }
          parent {
            id
            name
          }
        }
      }
    }
  }
`

const SEARCH_BY_COLLECTION = /* GraphQL */ `
  query Search($input: Vendure_SearchInput!) {
    vendure {
      search(input: $input) {
        items {
          slug
          productName
          productAsset {
            preview
          }
          currencyCode
          priceWithTax {
            ... on Vendure_PriceRange {
              min
              max
            }
          }
        }
      }
    }
  }
`

const GET_PRODUCT_IDS = /* GraphQL */ `
  query GetProductIds($input: Vendure_SearchInput!) {
    vendure {
      search(input: $input) {
        totalItems
        items {
          productId
        }
      }
    }
  }
`

const GET_PRODUCT = /* GraphQL */ `
  query GetProduct($id: ID!) {
    vendure {
      product(id: $id) {
        id
        slug
        name
        collections {
          id
          name
          slug
          breadcrumbs {
            id
            name
            slug
          }
        }
        description
        featuredAsset {
          id
          preview
        }
        assets {
          id
          preview
        }
        variants {
          id
          name
          priceWithTax
          currencyCode
        }
      }
    }
  }
`
