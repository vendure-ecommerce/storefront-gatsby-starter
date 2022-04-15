import { CartFragment } from "../fragments"
import { useMutation } from "urql"

export const AdjustOrderLine = /*GraphQL*/ `
    mutation AdjustOrderLine($lineId: ID!, $qty: Int!) {
        adjustOrderLine(orderLineId: $lineId, quantity: $qty) {
            ...Cart
            ...on ErrorResult {
                errorCode
                message
            }
        }
    }
    ${CartFragment}
`

export function useAdjustOrderLine() {
  const [{ data, error, fetching }, adjustOrderLine] = useMutation(AdjustOrderLine)
  return { data, error, fetching, adjustOrderLine }
}
