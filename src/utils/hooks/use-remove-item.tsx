import { CartFragment } from "../fragments"
import { useMutation } from "urql"

export const RemoveItemFromOrder = /*GraphQL*/ `
    mutation RemoveItemFromOrder($lineId: ID!) {
        removeOrderLine(orderLineId: $lineId) {
            ...Cart
            ...on ErrorResult {
                errorCode
                message
            }
        }
    }
    ${CartFragment}
`

export function useRemoveItem() {
  const [{ data, error, fetching }, removeItem] = useMutation(RemoveItemFromOrder)
  return { data, error, fetching, removeItem }
}
