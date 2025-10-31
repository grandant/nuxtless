// /types/customer.ts

import type {
  GetActiveCustomerQuery,
  GetActiveCustomerDetailQuery,
  LogInUserMutation,
  LogOutUserMutation,
  RegisterCustomerAccountMutation,
  VerifyCustomerAccountMutation,
  RequestPasswordResetMutation,
  ResetPasswordMutation,
  GetCustomerAddressesQuery,
} from "~~/.nuxt/gql/default";

// ─────────────────────────────────────────────────────────────
// Core Customer Types
// ─────────────────────────────────────────────────────────────

export type ActiveCustomerBase = GetActiveCustomerQuery["activeCustomer"];

export type ActiveCustomerDetail =
  GetActiveCustomerDetailQuery["activeCustomer"];

export type ActiveCustomer = ActiveCustomerBase | ActiveCustomerDetail;

// ─────────────────────────────────────────────────────────────
// Auth & Account Results
// ─────────────────────────────────────────────────────────────

export type LogInResult = LogInUserMutation["login"];

export type LogOutResult = LogOutUserMutation["logout"];

export type RegisterResult =
  RegisterCustomerAccountMutation["registerCustomerAccount"];

export type VerifyResult =
  VerifyCustomerAccountMutation["verifyCustomerAccount"];

export type RequestPasswordResetResult =
  RequestPasswordResetMutation["requestPasswordReset"];

export type ResetPasswordResult = ResetPasswordMutation["resetPassword"];

export type GetCustomerAddressesResult =
  GetCustomerAddressesQuery["activeCustomer"];
