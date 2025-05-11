import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const session = ref<{
      token: string | null;
      tokenSource?: "vendure";
      user?: {
        id: string;
        email: string;
      };
    } | null>(null);

    function setSession(
      token: string,
      user?: { id: string; email: string },
      source: "vendure" = "vendure",
    ) {
      session.value = { token, tokenSource: source, user };
    }

    function setUser(user: { id: string; email: string }) {
      if (session.value?.token) {
        session.value = { ...session.value, user };
      }
    }

    function clearSession() {
      session.value = null;
    }

    const isAuthenticated = computed(() => !!session.value?.user?.id);

    return {
      session,
      setSession,
      setUser,
      clearSession,
      isAuthenticated,
    };
  },
  {
    persist: true,
  },
);
