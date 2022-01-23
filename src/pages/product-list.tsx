import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ProductList = ({ data, errors }) => {
  if (errors?.length) {
    console.log(errors)
    return (
      <Layout>
        <div>{errors[0].message}</div>
      </Layout>
    )
  }
  return (
    <Layout>
      <Seo title="Products" />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.vendure.search.items.map(item => (
            <div key={item.productId} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={item.productAsset.preview}
                  alt={item.productName}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={item.slug}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {item.productName}
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {item.priceWithTax.min}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query SearchProducts {
    vendure {
      search(input: {
        take: 12
        groupByProduct: true
      }) {
        totalItems
        items {
          productId
          slug
          productName
          productAsset {
            id
            preview
          }
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

export default ProductList
