import { graphql } from "#layers/nuxtless/gql/graphql";

export const GetChannelCountries = graphql(`
  query GetChannelCountries {
    activeChannel {
      defaultShippingZone {
        id
        name
        members {
          id
          code
          name
        }
      }
    }
  }
`);
