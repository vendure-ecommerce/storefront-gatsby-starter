import { useQuery } from "urql";
import { CartFragment } from '../fragments';

const ActiveOrderQuery = /*GraphQL*/`
    query GetActiveOrder {
        activeOrder {
            ...Cart
        }
        activeChannel {
            id
            currencyCode
        }
    }
    ${CartFragment}
`;

export function useCart() {
    const [result, reexecuteQuery] = useQuery({
       query: ActiveOrderQuery,
     });

     return result;
}
