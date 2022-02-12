
export const ASSET_FRAGMENT = /*GraphQL*/`
    fragment Asset on Asset {
        id
        width
        height
        name
        preview
        focalPoint {
            x
            y
        }
    }
`;

export const CartFragment = /*GraphQL*/`
    fragment Cart on Order { 
        id
        code
        state
        active
        lines {
            id
            featuredAsset {
                ...Asset
            }
            unitPrice
            unitPriceWithTax
            quantity
            linePriceWithTax
            discountedLinePriceWithTax
            productVariant {
                id
                name
                product {
                    id 
                    slug
                }
            }
            discounts {
                amount
                amountWithTax
                description
                adjustmentSource
                type
            }
        }
        totalQuantity
        currencyCode
        subTotal
        subTotalWithTax
        total
        totalWithTax
        shipping
        shippingWithTax
        shippingLines {
            priceWithTax
            shippingMethod {
                id
                code
                name
                description
            }
        }
        discounts {
            amount
            amountWithTax
            description
            adjustmentSource
            type
        }
    }
    ${ASSET_FRAGMENT}
`;
