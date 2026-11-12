import { graphql } from "#layers/nuxtless/gql/graphql";

export const CreateStripePaymentIntent = graphql(`
  mutation CreateStripePaymentIntent {
    createStripePaymentIntent
  }
`);
