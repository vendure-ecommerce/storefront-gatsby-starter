import * as React from "react"
import { useEffect, useState } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { useProductSearch } from "../utils/hooks/use-product-search"
import { ProductCard } from "../components/product-card"
import { Breadcrumbs } from "../components/breadcrumbs"

const Search = ({ location }) => {
  const [query, setQuery] = useState("")

  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get("q"))
  }, [location.search])
  const result = useProductSearch({ term: query })
  return (
    <Layout>
      <Seo title="Products" />
      <div className="max-w-2xl mx-auto px-4 lg:max-w-6xl">
        <h2 className="text-5xl font-light tracking-tight text-gray-900 my-8">
          Results for "{query}"
        </h2>
        <Breadcrumbs
          items={[{ name: "Search", slug: "search", id: "search" }]}
        ></Breadcrumbs>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {result.products.map(item => (
            <ProductCard item={item}></ProductCard>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Search
