type ActiveCustomerBase = Awaited<
  ReturnType<typeof GqlGetActiveCustomer>
>["activeCustomer"];

export type ActiveCustomerDetail = Awaited<
  ReturnType<typeof GqlGetActiveCustomerDetail>
>["activeCustomer"];

export type ActiveCustomer = ActiveCustomerBase | ActiveCustomerDetail;
export type LogInResult = Awaited<ReturnType<typeof GqlLogInUser>>["login"];

export type LogOutResult = Awaited<ReturnType<typeof GqlLogOutUser>>["logout"];

export type RegisterResult = Awaited<
  ReturnType<typeof GqlRegisterCustomerAccount>
>["registerCustomerAccount"];

export type VerifyResult = Awaited<
  ReturnType<typeof GqlVerifyCustomerAccount>
>["verifyCustomerAccount"];

export type RequestPasswordResetResult = Awaited<
  ReturnType<typeof GqlRequestPasswordReset>
>["requestPasswordReset"];

export type ResetPasswordResult = Awaited<
  ReturnType<typeof GqlResetPassword>
>["resetPassword"];

export type GetCustomerAddressesResult = Awaited<
  ReturnType<typeof GqlGetCustomerAddresses>
>["activeCustomer"];
