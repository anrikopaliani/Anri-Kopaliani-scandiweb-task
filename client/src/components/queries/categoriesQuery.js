import { gql } from "graphql-request";

export const query = gql`
  {
    categories {
      name
      products {
        inStock
        id
        name
        gallery
        brand
        attributes {
          id
          name
          type
          items {
            value
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
    currencies {
      label
      symbol
    }
  }
`;
