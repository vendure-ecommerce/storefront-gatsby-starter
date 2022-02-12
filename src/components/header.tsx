import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { SearchBar } from "./search-bar"
import { ShoppingBagIcon } from "@heroicons/react/outline"
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ siteTitle, onCartClick }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      vendure {
        collections {
          items {
            id
            name
            slug
            parent {
              name
            }
          }
        }
      }
    }
  `)
  const topLevelCollections = data.vendure.collections.items.filter(
    collection => collection.parent.name === "__root_collection__"
  )
  return (
    <header className="bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg">
      <div className="max-w-6xl mx-auto p-4 flex items-center space-x-4">
        <h1 className="text-white w-10">
          <Link to="/">
            <StaticImage
              src="../images/cube-logo-line-icon-nostroke-white.png"
              width={75}
              quality={95}
              placeholder={""}
              formats={["auto", "webp", "avif"]}
              alt="Vendure logo"
            />
          </Link>
        </h1>
        <div className="flex space-x-4 hidden sm:block">
          {topLevelCollections.map(collection => (
            <Link className='text-sm md:text-base text-gray-200 hover:text-white' to={'/collection/' + collection.slug} key={collection.id}>{collection.name}</Link>
          ))}
        </div>
        <div className="flex-1 md:pr-8">
          <SearchBar></SearchBar>
        </div>
        <div className="">
          <button className="w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1" onClick={onCartClick}>
            <ShoppingBagIcon></ShoppingBagIcon>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
