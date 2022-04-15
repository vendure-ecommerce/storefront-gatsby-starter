// @ts-check

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import "./src/styles/global.css"
import * as React from "react"
import {createClient, dedupExchange, fetchExchange, Provider} from "urql"
import {cacheExchange} from "@urql/exchange-graphcache"
import {makeOperation} from "@urql/core"

const AUTH_TOKEN_KEY = "auth_token"

const client = createClient({
  fetch: (input, init) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      const headers = input instanceof Request ? input.headers : init.headers;
      headers['Authorization'] = `Bearer ${token}`;
    }
    return fetch(input, init).then(response => {
      const token = response.headers.get("vendure-auth-token")
      if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token)
      }
      return response
    })
  },
  url: process.env.GATSBY_VENDURE_SHOP_API_URL,
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          addItemToOrder: (parent, args, cache) => {
            const activeOrder = cache.resolve('Query', 'activeOrder');
            if (activeOrder == null) {
              // The first time that the `addItemToOrder` mutation is called in a session,
              // the `activeOrder` query needs to be manually updated to point to the newly-created
              // Order type. From then on, the graphcache will handle keeping it up-to-date.
              cache.link('Query', 'activeOrder', parent.addItemToOrder);
            }
          },
        },
      },
    }),
    fetchExchange,
  ],
})

export const wrapRootElement = ({ element }) => (
  <Provider value={client}>{element}</Provider>
)
