<script setup lang="ts">
const router = useRouter();
const localePath = useLocalePath();
const submitted = ref(false);

watch(submitted, (v) => {
  if (v) {
    router.push("/account");
  }
});
</script>

<template>
  <main class="container mt-14">
    <section class="flex flex-col items-center gap-8">
      <div class="flex flex-col items-center">
        <LogoElement :width="46" />
        <h1 class="text-2xl font-bold">Sign in to your account</h1>
        <p class="">
          Don’t have an account?
          <ULink :to="localePath('/account/register')" class="underline">
            Register here.
          </ULink>
        </p>
      </div>

      <div class="mx-auto flex w-full flex-col sm:w-xs md:w-sm">
        <AccountLoginForm @success="submitted = true" />
        <ULink
          :to="localePath('/account/request-password-reset')"
          class="mt-4 self-center"
        >
          Forgotten Password?
        </ULink>
      </div>
    </section>
  </main>
</template>

<style lang="css" scoped></style>
