import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { ProductCard } from "../components/product-card"
import { Breadcrumbs } from "../components/breadcrumbs"
import { CollectionCard } from "../components/collection-card"

const CollectionPage = ({
  pageContext: { collection, childCollections, products },
}) => (
  <Layout>
    <Seo title={collection.name} />
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-5xl font-light tracking-tight text-gray-900 my-8">
        {collection.name}
      </h2>

      <Breadcrumbs items={collection.breadcrumbs}></Breadcrumbs>
      {childCollections.length ? (
        <div className="max-w-2xl mx-auto px-4 py-16 sm:py-16 lg:max-w-none">
          <h2 className="text-2xl font-light text-gray-900">Collections</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {childCollections.map(child => (
              <CollectionCard collection={child}></CollectionCard>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="max-w-2xl mx-auto py-16 px-4 lg:max-w-6xl">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map(item => (
            <ProductCard item={item}></ProductCard>
          ))}
        </div>
      </div>
    </div>
  </Layout>
)

export default CollectionPage
