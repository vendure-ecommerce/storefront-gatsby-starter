/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import './src/styles/global.css'
import * as React from "react"
import { createClient, Provider } from "urql"

const client = createClient({
  url: "https://demo.vendure.io/shop-api",
})


export const wrapRootElement = ({ element }) => (
  <Provider value={client}>{element}</Provider>
)
