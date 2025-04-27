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
  }) {
    loading.value = true;
    error.value = null;

    try {
      const result: RegisterResult = (
        await GqlRegisterCustomerAccount({ input })
      ).registerCustomerAccount;

      if ("success" in result && result.success) {
        return true;
      } else if ("message" in result) {
        error.value = result.message;
      } else {
        error.value = "Registration failed";
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  }

  async function verify(token: string, password?: string) {
    loading.value = true;
    error.value = null;

    try {
      const result: VerifyResult = (
        await GqlVerifyCustomerAccount({ token, password })
      ).verifyCustomerAccount;

      if ("identifier" in result) {
        await fetchCustomer();
        return true;
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

  async function requestPasswordReset(emailAddress: string) {
    loading.value = true;
    error.value = null;

    try {
      const result: RequestPasswordResetResult = (
        await GqlRequestPasswordReset({ emailAddress })
      ).requestPasswordReset;

      if (result && "success" in result && result.success) {
        return true;
      } else if (result && "message" in result) {
        error.value = result.message;
      } else {
        error.value = "Password reset request failed";
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  }

  async function resetPassword(token: string, password: string) {
    loading.value = true;
    error.value = null;

    try {
      const result: ResetPasswordResult = (
        await GqlResetPassword({ token, password })
      ).resetPassword;

      if ("identifier" in result) {
        await fetchCustomer();
        return true;
      } else if ("message" in result) {
        error.value = result.message;
      } else {
        error.value = "Failed to reset password";
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
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
