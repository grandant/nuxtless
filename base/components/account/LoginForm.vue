<script setup lang="ts">
import { LoginForm } from "~~/base/validators/loginForm";
import type { FormSubmitEvent } from "@nuxt/ui";

const emit = defineEmits<{
  (e: "success"): void;
}>();

// const router = useRouter();
// const toast = useToast();

// const runtimeConfig = useRuntimeConfig();
// const { locale } = useI18n();

// const { login } = useCustomerStore();

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const authToken = useState("authToken");
const headers = useState<Record<string, string>>("headers");

const authStore = useAuthStore();

const state = reactive({
  email: "",
  password: "",
});

async function loginWithFetch(email: string, password: string) {
  const query = `
    mutation LogInUser($emailAddress: String!, $password: String!, $rememberMe: Boolean!) {
      login(username: $emailAddress, password: $password, rememberMe: $rememberMe) {
        ... on CurrentUser {
          id
          identifier
        }
        ... on ErrorResult {
          errorCode
          message
        }
      }
    }
  `;

  const res = await fetch(
    `${runtimeConfig.public.GQL_HOST}?languageCode=${locale}`,
    {
      method: "POST",
      credentials: "include",
      headers: headers.value,
      body: JSON.stringify({
        query,
        variables: {
          emailAddress: email,
          password,
          rememberMe: true,
        },
      }),
    },
  );

  const newToken = res.headers.get("vendure-auth-token");
  console.log(newToken);
  if (newToken) {
    authStore.setSession(newToken);
    authToken.value = newToken;
    headers.value.authorization = `Bearer ${newToken}`;
    useGqlHeaders(headers.value);
  }

  const result = await res.json();
  return result.data.login;
}

async function onSubmit(event: FormSubmitEvent<LoginForm>) {
  const result = await loginWithFetch(event.data.email, event.data.password);
  // useGqlHeaders(headers.value);
  await useOrderStore().fetchOrder();
  console.log(result);
  await useCustomerStore().fetchCustomer();
  console.log("Customer:", useCustomerStore().customer);
}
</script>

<template>
  <UForm
    :schema="LoginForm"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit"> Login </UButton>
  </UForm>
</template>

<style lang="css" scoped></style>
