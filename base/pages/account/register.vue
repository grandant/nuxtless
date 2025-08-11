<script setup lang="ts">
definePageMeta({
  alias: ["/register"],
});

const localePath = useLocalePath();
const { isAuthenticated } = storeToRefs(useAuthStore());
const loading = ref(true);

onMounted(() => {
  if (isAuthenticated.value) {
    navigateTo(localePath("/account"), { replace: true });
    return;
  }

  loading.value = false;
});
</script>

<template>
  <BaseLoader v-if="loading" width="sm:w-xs md:w-sm" />
  <main v-else class="container mt-14">
    <header
      class="mb-8 flex flex-col items-center"
      aria-labelledby="register-heading"
    >
      <LogoElement :width="46" aria-hidden="true" focusable="false" />
      <h1 id="register-heading" class="text-2xl font-bold">
        Register an account
      </h1>
      <p>
        Already have an account?
        <ULink :to="localePath('/account/login')" class="underline">
          Login here.
        </ULink>
      </p>
    </header>

    <AccountRegisterForm
      class="mx-auto mb-14 flex w-full flex-col sm:w-xs md:w-sm"
    />
  </main>
</template>
