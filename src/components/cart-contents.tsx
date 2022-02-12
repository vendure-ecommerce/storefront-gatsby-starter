import * as React from "react"
import { Link } from "gatsby"
import { useAddItem } from "../utils/hooks/use-add-item"
import { useRemoveItem } from "../utils/hooks/use-remove-item"
import { formatPrice } from '../utils/format-price';

export function CartContents({ orderLines, currencyCode }) {
  const { data, error, fetching, removeItem } = useRemoveItem()
  return (
    <div className="flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {orderLines.map(line => (
          <li key={line.id} className="py-6 flex">
            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
              <img
                src={line.featuredAsset.preview + "?preset=thumb"}
                alt={line.productVariant.name}
                className="w-full h-full object-center object-cover"
              />
            </div>

            <div className="ml-4 flex-1 flex flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <Link to={`/product/${line.productVariant.product.slug}`}>
                      {line.productVariant.name}
                    </Link>
                  </h3>
                  <p className="ml-4">{formatPrice(line.linePriceWithTax, currencyCode)}</p>
                </div>
              </div>
              <div className="flex-1 flex items-end justify-between text-sm">
                <p className="text-gray-500">Qty {line.quantity}</p>

                <div className="flex">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => removeItem({ lineId: line.id })}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
