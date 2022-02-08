import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import { formatPrice } from "../utils/format-price"

export function CollectionCard({ collection }: any) {
  const image = getImage(collection.featuredAsset.imageFile);
  return (
    <Link
      to={"/collection/" + collection.slug}
      key={collection.id}
      className="relative rounded-lg overflow-hidden hover:opacity-75 xl:w-auto"
    >
      <span aria-hidden="true" className="">
        <div className="w-full h-full object-center object-cover">
          <GatsbyImage
            image={image}
            alt={collection.name}
            className="w-full h-full object-center object-cover"
          />
        </div>
      </span>
      <span
        aria-hidden="true"
        className="absolute w-full bottom-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
      />
      <span className="absolute w-full bottom-2 mt-auto text-center text-xl font-bold text-white">
        {collection.name}
      </span>
    </Link>
  )
}
