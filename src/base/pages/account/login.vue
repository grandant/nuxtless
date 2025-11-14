<script setup lang="ts">
definePageMeta({
  alias: ["/login"],
});

const router = useRouter();
const { t } = useI18n();
const localePath = useLocalePath();
const { isAuthenticated } = storeToRefs(useAuthStore());
const loading = ref(true);
const submitted = ref(false);

watch(submitted, (v) => {
  if (v) {
    router.push(localePath("/account"));
  }
});

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
      aria-labelledby="login-heading"
    >
      <LogoElement
        logo-light="/logo-full.svg"
        logo-dark="/logo-full.svg"
        :width="100"
        aria-hidden="true"
        focusable="false"
        class="mb-4"
      />
      <h1 id="login-heading" class="text-2xl font-bold">
        {{ t("messages.pages.account.signIn") }}
      </h1>
      <p>
        {{ t("messages.account.noAccount") }}
        <ULink :to="localePath('/account/register')" class="underline">
          {{ t("messages.account.accountRegister") }}.
        </ULink>
      </p>
    </header>

    <AccountLoginForm
      class="mx-auto mb-14 flex w-full flex-col sm:w-xs md:w-sm"
      @success="submitted = true"
    />
  </main>
</template>

<style lang="css" scoped></style>
