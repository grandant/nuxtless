import { graphql } from "#layers/nuxtless/gql/graphql";

export const CustomerBase = graphql(`
  fragment CustomerBase on Customer {
    id
    title
    firstName
    lastName
    emailAddress
  }
`);

export const CustomerDetail = graphql(`
  fragment CustomerDetail on Customer {
    id
    title
    firstName
    lastName
    emailAddress
    phoneNumber
    addresses {
      id
      fullName
      streetLine1
      city
      postalCode
      country {
        code
        name
      }
    }
    user {
      id
      identifier
    }
  }
`);

export const CurrentUser = graphql(`
  fragment CurrentUser on CurrentUser {
    __typename
    id
    identifier
  }
`);
