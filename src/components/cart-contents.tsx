import * as React from "react"
import { Link } from "gatsby"
import { useAddItem } from "../utils/hooks/use-add-item"
import { useRemoveItem } from "../utils/hooks/use-remove-item"
import { formatPrice } from "../utils/format-price"
import { useAdjustOrderLine } from '../utils/hooks/use-adjust-order-line';

export function CartContents({ orderLines, currencyCode }) {
  const { data, error, fetching, removeItem } = useRemoveItem()
  const { adjustOrderLine } = useAdjustOrderLine()
  return (
    <div className="flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {(orderLines ?? []).map(line => (
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
                  <p className="ml-4">
                    {formatPrice(line.linePriceWithTax, currencyCode)}
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-center text-sm">
                <label htmlFor={`quantity-${line.id}`} className='mr-2'>Quantity</label>
                <select
                  id={`quantity-${line.id}`}
                  name={`quantity-${line.id}`}
                  onChange={e => adjustOrderLine({ lineId: line.id, qty: +e.target.value })}
                  className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                </select>
                <div className="flex-1"></div>
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
