import type {
  RegisterResult,
  VerifyResult,
  RequestPasswordResetResult,
  ResetPasswordResult,
} from "#layers/nuxtless/types";

import { readFragment } from "gql.tada";
import { parse } from "valibot";

import {
  CustomerBase,
  CustomerDetail,
} from "#layers/nuxtless/gql/fragments/customer";

import {
  GetActiveCustomer,
  GetActiveCustomerDetail,
} from "#layers/nuxtless/gql/queries/customer";

import {
  RegisterCustomerAccount,
  VerifyCustomerAccount,
  RequestPasswordReset,
  ResetPassword,
} from "#layers/nuxtless/gql/mutations/customer";

import {
  ActiveCustomerBase,
  ActiveCustomerDetail,
} from "#layers/nuxtless/validators/customer";

import type { ActiveCustomer } from "#layers/nuxtless/validators/customer";

export const useCustomerStore = defineStore("customer", () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const customer = ref<ActiveCustomer | null>(null);

  async function fetchCustomer(type: "base" | "detail" = "base") {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      if (type === "detail") {
        const result = await client
          .query(GetActiveCustomerDetail, {}, { requestPolicy: "network-only" })
          .toPromise();

        if (result.error) throw result.error;

        customer.value = result.data?.activeCustomer
          ? parse(
              ActiveCustomerDetail,
              readFragment(CustomerDetail, result.data.activeCustomer),
            )
          : null;
      } else {
        const result = await client
          .query(GetActiveCustomer, {}, { requestPolicy: "network-only" })
          .toPromise();

        if (result.error) throw result.error;

        customer.value = result.data?.activeCustomer
          ? parse(
              ActiveCustomerBase,
              readFragment(CustomerBase, result.data.activeCustomer),
            )
          : null;
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
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(RegisterCustomerAccount, { input })
        .toPromise();

      if (mutationError) throw mutationError;

      return data?.registerCustomerAccount;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
      return undefined;
    } finally {
      loading.value = false;
    }
  }

  async function verify(token: string): Promise<VerifyResult | undefined> {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(VerifyCustomerAccount, { token })
        .toPromise();

      if (mutationError) throw mutationError;

      const result = data?.verifyCustomerAccount;

      if (result?.__typename === "CurrentUser") {
        await fetchCustomer();
      }

      return result;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
      return undefined;
    } finally {
      loading.value = false;
    }
  }

  async function requestPasswordReset(
    emailAddress: string,
  ): Promise<RequestPasswordResetResult | undefined> {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(RequestPasswordReset, { emailAddress })
        .toPromise();

      if (mutationError) throw mutationError;

      return data?.requestPasswordReset;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
      return undefined;
    } finally {
      loading.value = false;
    }
  }

  async function resetPassword(
    token: string,
    password: string,
  ): Promise<ResetPasswordResult | undefined> {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(ResetPassword, { token, password })
        .toPromise();

      if (mutationError) throw mutationError;

      const result = data?.resetPassword;

      if (result?.__typename === "CurrentUser") {
        await fetchCustomer();
      }

      return result;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
      return undefined;
    } finally {
      loading.value = false;
    }
  }

  function resetCustomerStore() {
    customer.value = null;
    loading.value = false;
    error.value = null;
  }

  return {
    loading,
    error,

    customer,

    fetchCustomer,
    register,
    verify,
    requestPasswordReset,
    resetPassword,

    resetCustomerStore,
  };
});
