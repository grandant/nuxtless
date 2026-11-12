import { graphql } from "#layers/nuxtless/gql/graphql";
import { CustomerBase, CustomerDetail } from "../fragments/customer";

export const GetActiveCustomer = graphql(
  `
    query GetActiveCustomer {
      activeCustomer {
        ...CustomerBase
      }
    }
  `,
  [CustomerBase],
);

export const GetActiveCustomerDetail = graphql(
  `
    query GetActiveCustomerDetail {
      activeCustomer {
        ...CustomerDetail
      }
    }
  `,
  [CustomerDetail],
);

export const GetCustomerAddresses = graphql(`
  query GetCustomerAddresses {
    activeCustomer {
      id
      addresses {
        id
        fullName
        streetLine1
        streetLine2
        city
        postalCode
        country {
          code
          name
        }
        phoneNumber
      }
    }
  }
`);
