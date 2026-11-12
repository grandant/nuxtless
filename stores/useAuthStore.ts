import { readFragment } from "gql.tada";

import { CurrentUser } from "#layers/nuxtless/gql/fragments/customer";
import { LogInUser, LogOutUser } from "#layers/nuxtless/gql/mutations/customer";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const loading = ref(false);
    const error = ref<string | null>(null);

    const user = ref<{
      id: string;
      email: string;
    } | null>(null);

    const isAuthenticated = computed(() => !!user.value?.id);

    function setUser(value: { id: string; email: string }) {
      user.value = value;
    }

    function clearSession() {
      user.value = null;
    }

    async function login(
      emailAddress: string,
      password: string,
      rememberMe: boolean = true,
    ) {
      loading.value = true;
      error.value = null;

      try {
        const client = useUrqlClient();

        const { data, error: mutationError } = await client
          .mutation(LogInUser, {
            emailAddress,
            password,
            rememberMe,
          })
          .toPromise();

        if (mutationError) throw mutationError;

        const result = data?.login;

        if (result?.__typename !== "CurrentUser") {
          throw new Error(result?.message ?? "Login failed");
        }

        const currentUser = readFragment(CurrentUser, result);

        if (!currentUser?.id) {
          throw new Error("Invalid login response");
        }

        setUser({
          id: currentUser.id,
          email: currentUser.identifier,
        });
      } catch (err) {
        if (err instanceof Error) {
          error.value = err.message || "Failed to log in";
        }
      } finally {
        loading.value = false;
      }
    }

    async function logout() {
      try {
        const client = useUrqlClient();

        const { data, error } = await client
          .mutation(LogOutUser, {})
          .toPromise();

        if (error) throw error;
        if (!data?.logout.success) throw new Error("Logout failed");

        clearSession();
      } catch (err) {
        if (err instanceof Error) {
          error.value = err.message || "Failed to log in";
        }
      } finally {
        loading.value = false;
      }
    }

    return {
      loading,
      error,

      user,
      isAuthenticated,
      setUser,

      clearSession,
      login,
      logout,
    };
  },
  {
    persist: true,
  },
);
