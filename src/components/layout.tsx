/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import { CartTray } from "./cart-tray"
import { useState } from "react"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const [open, setOpen] = useState(false)
  const onCartClick = () => setOpen(true)
  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        onCartClick={onCartClick}
      />
      <CartTray open={open} onClose={setOpen}></CartTray>
      <div>
        <main>{children}</main>
        <footer className="py-24 px-2 border-t mt-6">
          <div className="max-w-6xl mx-auto text-xs md:text-sm">
            <p>
              Built with{" "}
              <a
                href="https://www.vendure.io/"
                className="text-blue-500 hover:text-blue-700"
              >
                Vendure
              </a>{" "}
              &{" "}
              <a
                href="https://www.gatsbyjs.com"
                className="text-purple-500 hover:text-purple-700"
              >
                Gatsby
              </a>
            </p>
            <p>
              <a
                className="font-medium text-gray-500 hover:text-gray-700"
                href="https://github.com/vendure-ecommerce/storefront-gatsby-starter"
              >
                github.com/vendure-ecommerce/storefront-gatsby-starter
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout
