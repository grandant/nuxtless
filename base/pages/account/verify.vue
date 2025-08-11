<script setup lang="ts">
definePageMeta({
  alias: ["/verify"],
});

const route = useRoute();
const token = route.query.token as string | undefined;
const localePath = useLocalePath();
const toast = useToast();

const { isAuthenticated } = storeToRefs(useAuthStore());
const { verify } = useCustomerStore();
const loading = ref(true);
const verifying = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  if (isAuthenticated.value) {
    await navigateTo(localePath("/account"), { replace: true });
    return;
  }

  loading.value = false;

  if (!token) {
    error.value = "Missing verification token.";
    verifying.value = false;
    return;
  }

  const result = await verify(token);

  if (result && "identifier" in result) {
    await navigateTo(localePath("/account/login"), { replace: true });
    toast.add({
      title: "Account Verified",
      description: "You can now login with your email and password.",
      color: "success",
    });
  } else {
    error.value = result?.message ?? "Verification failed.";
    verifying.value = false;
  }
});
</script>

<template>
  <BaseLoader v-if="loading" width="sm:w-xs md:w-sm" />
  <main v-else class="container mt-14">
    <header
      class="mb-8 flex flex-col items-center"
      aria-labelledby="verify-heading"
    >
      <LogoElement :width="46" aria-hidden="true" focusable="false" />
      <h1 id="verify-heading" class="text-2xl font-bold">
        Account Verification
      </h1>
      <p>
        Back to
        <ULink :to="localePath('/account/login')" class="underline">
          Login
        </ULink>
      </p>
    </header>

    <section class="mb-14 flex flex-col items-center">
      <div
        class="mx-auto flex w-full flex-col items-center text-center sm:w-xs md:w-sm"
      >
        <p v-if="verifying">Verifying your account...</p>
        <p v-else-if="error" role="alert" class="text-red-600">{{ error }}</p>
        <p v-else>Verification complete. Redirecting…</p>
      </div>
    </section>
  </main>
</template>

<style lang="css" scoped></style>
