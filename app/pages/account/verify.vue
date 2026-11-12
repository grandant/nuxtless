<script setup lang="ts">
definePageMeta({
  alias: ["/verify"],
});

const route = useRoute();
const token = route.query.token as string | undefined;
const { t } = useI18n();
const localePath = useLocalePath();
const toast = useToast();

const authStore = useAuthStore();
const customerStore = useCustomerStore();

const { isAuthenticated } = storeToRefs(authStore);

const { verify } = customerStore;

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

  if (result?.__typename === "CurrentUser") {
    await navigateTo(localePath("/account/login"), { replace: true });

    toast.add({
      title: t("messages.account.verifySuccess"),
      description: t("messages.account.verifySuccessMessage"),
      color: "success",
    });
  } else {
    error.value = result?.message ?? "Verification failed.";
    verifying.value = false;
  }
});
</script>

<template>
  <UContainer>
    <BaseLoader v-if="loading" width="sm:w-xs md:w-sm" />

    <UPage v-else>
      <header class="mt-12 mb-8 flex flex-col items-center">
        <LogoElement
          aria-hidden="true"
          focusable="false"
          wrapper-class="w-1/2 h-[125px] justify-center"
          class="mb-4"
        />
        <h1 class="text-2xl font-bold">
          {{ t("messages.pages.account.accountVerify") }}
        </h1>
        <p>
          <ULink :to="localePath('/account/login')" class="underline">
            {{ t("messages.account.backToLogin") }}
          </ULink>
        </p>
      </header>

      <UPageSection :ui="{ container: 'pt-0 lg:pt-0 pb-12' }">
        <div
          class="mx-auto flex w-full flex-col items-center text-center sm:w-xs md:w-sm"
        >
          <p v-if="verifying">Verifying your account...</p>
          <p v-else-if="error" role="alert" class="text-red-600">
            {{ error }}
          </p>
          <p v-else>Verification complete. Redirecting…</p>
        </div>
      </UPageSection>
    </UPage>
  </UContainer>
</template>

<style lang="css" scoped></style>
