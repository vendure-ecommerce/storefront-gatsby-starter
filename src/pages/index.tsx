import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { CollectionCard } from "../components/collection-card"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query HomePageQuery {
      vendure {
        collections {
          items {
            id
            name
            description
            slug
            featuredAsset {
              id
              preview
              imageFile {
                childImageSharp {
                  gatsbyImageData(width: 300, height: 300, quality: 85)
                }
              }
            }
          }
        }
      }
    }
  `)
  const collections = data.vendure.collections.items
  const headerImage = getImage(collections[0]?.featuredAsset.imageFile)
  return (
    <Layout>
      <Seo title="Home" />
      {/* Hero section */}
      <div className="relative">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          {headerImage && (
            <GatsbyImage
              alt="header"
              image={headerImage}
              className="absolute inset-0"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-800 to-indigo-900 mix-blend-multiply" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />
        <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
          <h1 className="text-5xl font-light tracking-tight text-white lg:text-6xl">
            Vendure Gatsby Starter
          </h1>
          <p className="mt-4 text-xl text-white">
            A{" "}
            <a
              href="https://www.vendure.io"
              className="text-blue-300 hover:text-blue-500"
            >
              Vendure
            </a>{" "}
            storefront starter built with{" "}
            <a
              href="https://www.gatsbyjs.com/"
              className="text-purple-300 hover:text-purple-500"
            >
              Gatsby
            </a>
            .
          </p>
        </div>
      </div>

      <section
        aria-labelledby="category-heading"
        className="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8"
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-light tracking-tight text-gray-900"
          >
            Shop by Category
          </h2>
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
              <div className="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
                {collections.map(category => (
                  <CollectionCard collection={category}></CollectionCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:hidden">
          <a
            href="#"
            className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Browse all categories<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
