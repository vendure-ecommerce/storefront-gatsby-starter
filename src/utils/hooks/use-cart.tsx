import { useQuery } from "urql"
import { CartFragment } from "../fragments"

const ActiveOrderQuery = /*GraphQL*/ `
    query GetActiveOrder {
        activeChannel {
            id
            currencyCode
        }
        activeOrder {
            ...Cart
        }
    }
    ${CartFragment}
`

export function useCart() {
  const [result, reexecuteQuery] = useQuery({
    query: ActiveOrderQuery,
  })

  return result
}
