export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref<string | null>(null);

    function setToken(newToken: string) {
      token.value = newToken;
    }

    function clearToken() {
      token.value = null;
    }

    return {
      token,
      setToken,
      clearToken,
    };
  },
  {
    persist: true,
  },
);
