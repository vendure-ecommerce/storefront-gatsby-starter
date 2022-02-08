import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import { formatPrice } from "../utils/format-price"

export function ProductCard({ item }: any) {
  const image = getImage(item.productAsset.imageFile)
  return (
    <div key={item.slug} className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
        <div className="w-full h-full object-center object-cover lg:w-full lg:h-full">
          <GatsbyImage
            image={image}
            alt={item.productName}
            className="w-full h-full object-center object-cover"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={"/product/" + item.slug}>
              <span aria-hidden="true" className="absolute inset-0" />
              {item.productName}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {formatPrice(item.priceWithTax.min, item.currencyCode)}
        </p>
      </div>
    </div>
  )
}
