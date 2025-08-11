<script setup lang="ts">
definePageMeta({
  alias: ["/request-password-reset"],
});

const localePath = useLocalePath();
const { isAuthenticated } = storeToRefs(useAuthStore());
const loading = ref(true);
const submitted = ref(false);

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
      aria-labelledby="reset-heading"
    >
      <LogoElement :width="46" aria-hidden="true" focusable="false" />
      <h1 id="reset-heading" class="text-2xl font-bold">
        Request Password Reset
      </h1>
      <p>
        Remember your password?
        <ULink :to="localePath('/account/login')" class="underline">
          Login here.
        </ULink>
      </p>
    </header>

    <section class="mb-14 flex flex-col items-center">
      <div class="mx-auto flex w-full flex-col sm:w-xs md:w-sm">
        <p v-if="submitted" class="text-center">
          Check you email to reset your password.
        </p>
        <AccountRequestPasswordResetForm v-else @success="submitted = true" />
      </div>
    </section>
  </main>
</template>
