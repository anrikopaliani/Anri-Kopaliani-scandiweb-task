import { gql } from "graphql-request";

export const singleProductQuery = gql`
  query getProducts($id: String!) {
    product(id: $id) {
      name
      id
      description
      brand
      gallery
      inStock
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
    }
  }
`;
