/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import "./src/styles/global.css"
import * as React from "react"
import { createClient, dedupExchange, fetchExchange, Provider } from "urql"
import { cacheExchange } from "@urql/exchange-graphcache"
import { makeOperation } from "@urql/core"
import { authExchange } from "@urql/exchange-auth"

const AUTH_TOKEN_KEY = "auth_token"

const getAuth = async ({ authState }) => {
  if (!authState) {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      return { token }
    }
    return null
  }

  return null
}

const addAuthToOperation = ({ authState, operation }) => {
  if (!authState || !authState.token) {
    return operation
  }
  const context = operation.context
  const fetchOptions =
    typeof context.fetchOptions === "function"
      ? context.fetchOptions()
      : context.fetchOptions || {}

  return makeOperation(operation.kind, operation, {
    ...context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authState.token}`,
      },
    },
  })
}

const client = createClient({
  url: process.env.GATSBY_VENDURE_SHOP_API_URL,
  fetch: (...args) => {
    return fetch(...args).then(response => {
      const token = response.headers.get("vendure-auth-token")
      if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token)
      }
      return response
    })
  },
  exchanges: [
    dedupExchange,
    cacheExchange({}),
    authExchange({
      getAuth,
      addAuthToOperation,
    }),
    fetchExchange,
  ],
})

export const wrapRootElement = ({ element }) => (
  <Provider value={client}>{element}</Provider>
)
