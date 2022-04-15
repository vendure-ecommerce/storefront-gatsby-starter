# Vendure Gatsby Storefront Starter

A storefront for [Vendure](https://www.vendure.io/) built with [Gatsby](https://www.gatsbyjs.com/).

## To do:

* Cart
* Checkout flow
* Search facet filters
* Customer account management

**Contributions welcome!**

## Development

1. `npm install`
2. Create an `.env.development` file defining the following environment variables:
   ```
   GATSBY_VENDURE_SHOP_API_URL=https://readonlydemo.vendure.io/shop-api
   # or
   GATSBY_VENDURE_SHOP_API_URL=http://localhost:3000/shop-api
   ```
3. If using local Vendure server, ensure you have `apiOptions.tokenMethod` set to `'bearer'` or `['bearer', 'cookie']` - this storefront requires bearer tokens.
4. `npm run develop`
