<script setup lang="ts">
definePageMeta({
  alias: ["/verify"],
});

const route = useRoute();
const token = route.query.token as string | undefined;
const { t } = useI18n();
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
      <LogoElement
        logo-light="/logo-full.svg"
        logo-dark="/logo-full.svg"
        :width="100"
        aria-hidden="true"
        focusable="false"
        class="mb-4"
      />
      <h1 id="verify-heading" class="text-2xl font-bold">
        {{ t("messages.pages.account.accountVerify") }}
      </h1>
      <p>
        <ULink :to="localePath('/account/login')" class="underline">
          {{ t("messages.account.backToLogin") }}
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
