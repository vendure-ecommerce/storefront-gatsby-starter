import { CartFragment } from "../fragments"
import { useMutation } from "urql"

export const AddItemToOrder = /*GraphQL*/ `
    mutation AddItemToOrder($variantId: ID!, $quantity: Int!) {
        addItemToOrder(productVariantId: $variantId, quantity: $quantity) {
            ...Cart
            ...on ErrorResult {
                errorCode
                message
            }   
            ...on InsufficientStockError {
                order {
                    ...Cart
                }
            }
        }
    }
    ${CartFragment}
`

export function useAddItem() {
  const [{ data, error, fetching }, addItem] = useMutation(AddItemToOrder)
  return { data, error, fetching, addItem }
}
