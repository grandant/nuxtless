<script setup lang="ts">
definePageMeta({
  alias: ["/verify"],
});

const route = useRoute();
const router = useRouter();
const token = route.query.token as string | undefined;

const { verify } = useCustomerStore();
const verifying = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  if (!token) {
    error.value = "Missing verification token.";
    verifying.value = false;
    return;
  }

  const result = await verify(token);

  if (result && "identifier" in result) {
    router.replace("/login?verified=true");
  } else {
    error.value = result?.message ?? "Verification failed.";
    verifying.value = false;
  }
});
</script>

<template>
  <main class="prose mx-auto p-4">
    <h1>Account Verification</h1>
    <p v-if="verifying">Verifying your account...</p>
    <p v-else-if="error" role="alert" class="text-red-600">{{ error }}</p>
    <p v-else>Verification complete. Redirecting…</p>
  </main>
</template>

<style lang="css" scoped></style>
