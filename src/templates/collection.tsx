import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { ProductCard } from "../components/product-card"
import { Breadcrumbs } from "../components/breadcrumbs"

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
          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
            {childCollections.map(child => (
              <div key={child.id} className="group relative">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={child.featuredAsset.preview + "?preset=medium"}
                    alt={child.imageAlt}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <Link to={'/collection/' + child.slug}>
                    <span className="absolute inset-0" />
                    {child.name}
                  </Link>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {child.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : ''}

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
