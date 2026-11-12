import { graphql } from "#layers/nuxtless/gql/graphql";
import { CurrentUser } from "../fragments/customer";

export const LogInUser = graphql(
  `
    mutation LogInUser(
      $emailAddress: String!
      $password: String!
      $rememberMe: Boolean!
    ) {
      login(
        username: $emailAddress
        password: $password
        rememberMe: $rememberMe
      ) {
        __typename
        ... on CurrentUser {
          ...CurrentUser
        }
        ... on ErrorResult {
          errorCode
          message
        }
      }
    }
  `,
  [CurrentUser],
);

export const LogOutUser = graphql(`
  mutation LogOutUser {
    logout {
      success
    }
  }
`);

export const RegisterCustomerAccount = graphql(`
  mutation RegisterCustomerAccount($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      __typename
      ... on Success {
        success
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const VerifyCustomerAccount = graphql(
  `
    mutation VerifyCustomerAccount($password: String, $token: String!) {
      verifyCustomerAccount(password: $password, token: $token) {
        __typename
        ... on CurrentUser {
          ...CurrentUser
        }
        ... on ErrorResult {
          errorCode
          message
        }
      }
    }
  `,
  [CurrentUser],
);

export const RequestPasswordReset = graphql(`
  mutation RequestPasswordReset($emailAddress: String!) {
    requestPasswordReset(emailAddress: $emailAddress) {
      __typename
      ... on Success {
        success
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const ResetPassword = graphql(
  `
    mutation ResetPassword($token: String!, $password: String!) {
      resetPassword(token: $token, password: $password) {
        __typename
        ... on CurrentUser {
          ...CurrentUser
        }
        ... on ErrorResult {
          errorCode
          message
        }
      }
    }
  `,
  [CurrentUser],
);
