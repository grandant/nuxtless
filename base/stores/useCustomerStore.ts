import type {
  ActiveCustomer,
  LogInResult,
  LogOutResult,
  RegisterResult,
  VerifyResult,
  RequestPasswordResetResult,
  ResetPasswordResult,
} from "~~/types/customer";

export const useCustomerStore = defineStore("customer", () => {
  const customer = ref<ActiveCustomer | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCustomer() {
    loading.value = true;
    error.value = null;

    try {
      const { activeCustomer } = await GqlGetActiveCustomer();
      customer.value = activeCustomer ?? null;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  }

  async function login(email: string, password: string, rememberMe = true) {
    loading.value = true;
    error.value = null;

    try {
      const result: LogInResult = (
        await GqlLogInUser({
          emailAddress: email,
          password,
          rememberMe,
        })
      ).login;

      if ("id" in result) {
        await fetchCustomer();
      } else {
        error.value = result.message;
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    loading.value = true;
    error.value = null;

    try {
      const result: LogOutResult = (await GqlLogOutUser()).logout;

      if (result.success) {
        customer.value = null;
      } else {
        error.value = "Logout failed";
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  }

  async function register(input: {
    emailAddress: string;
    firstName: string;
    lastName: string;
    password?: string;
  }): Promise<RegisterResult | undefined> {
    try {
      const result = (await GqlRegisterCustomerAccount({ input }))
        .registerCustomerAccount;

      return result;
    } catch (err) {
      console.error("Registration error:", err);
      return undefined;
    }
  }

  async function verify(token: string): Promise<VerifyResult | undefined> {
    try {
      const result = (await GqlVerifyCustomerAccount({ token }))
        .verifyCustomerAccount;

      if ("identifier" in result) {
        await fetchCustomer();
      }
      return result;
    } catch (err) {
      console.error("Unexpected verification error:", err);
      return undefined;
    }
  }

  async function requestPasswordReset(
    emailAddress: string,
  ): Promise<RequestPasswordResetResult | undefined> {
    try {
      const result = (await GqlRequestPasswordReset({ emailAddress }))
        .requestPasswordReset;

      return result;
    } catch (err) {
      console.error("Password reset request error:", err);
      return undefined;
    }
  }

  async function resetPassword(
    token: string,
    password: string,
  ): Promise<ResetPasswordResult | undefined> {
    try {
      const result = (await GqlResetPassword({ token, password }))
        .resetPassword;

      if ("identifier" in result) {
        await fetchCustomer();
      }

      return result;
    } catch (err) {
      console.error("Reset password error:", err);
      return undefined;
    }
  }

  return {
    customer,
    loading,
    error,
    fetchCustomer,
    login,
    logout,
    register,
    verify,
    requestPasswordReset,
    resetPassword,
  };
});
