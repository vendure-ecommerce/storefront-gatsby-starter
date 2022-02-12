import * as React from "react"
import { ChangeEvent, useState } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Breadcrumbs } from "../components/breadcrumbs"
import { HeartIcon } from "@heroicons/react/outline"
import { formatPrice } from "../utils/format-price"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useAddItem } from "../utils/hooks/use-add-item"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const ProductPage = ({ pageContext: { product } }) => {
  const image = getImage(product.featuredAsset.imageFile)
  const { data, error, fetching, addItem } = useAddItem()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  function selectVariant(event: ChangeEvent<HTMLSelectElement>) {
    const selected = product.variants.find(
      variant => variant.id === event.target.value
    )
    if (selected) {
      setSelectedVariant(selected)
    }
  }
  const addToCart = () => {
    addItem({ variantId: selectedVariant.id, quantity: 1 });
  }
  return (
    <Layout>
      <Seo title={product.name} />
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-light tracking-tight text-gray-900 my-8">
          {product.name}
        </h2>
        <Breadcrumbs
          items={
            product.collections[product.collections.length - 1].breadcrumbs
          }
        ></Breadcrumbs>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
          {/* Image gallery */}
          <div className="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <span className="rounded-md overflow-hidden">
              <div className="w-full h-full object-center object-cover rounded-lg">
                <GatsbyImage
                  image={image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover rounded-lg"
                />
              </div>
            </span>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="text-base text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            {1 < product.variants.length ? (
              <div>
                <label
                  htmlFor="option"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <select
                  id="option"
                  name="option"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  onChange={selectVariant}
                >
                  {product.variants.map(variant => (
                    <option value={variant.id}>{variant.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              ""
            )}

            <div className="mt-10 flex flex-col md:flex-row items-center">
              <p className="text-3xl text-gray-900 mr-4">
                {formatPrice(
                  selectedVariant.priceWithTax,
                  selectedVariant.currencyCode
                )}
              </p>
              <div className="flex sm:flex-col1 align-baseline">
                <button
                  type="submit"
                  onClick={addToCart}
                  className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                >
                  Add to cart
                </button>

                <button
                  type="button"
                  className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon
                    className="h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductPage
