<script setup lang="ts">
definePageMeta({
  alias: ["/password-reset"],
});
</script>

<template>
  <main class="prose mx-auto p-4">
    <h1>Reset Your Password</h1>

    <p>Please enter your new password.</p>

    <AccountResetPasswordForm />
  </main>
</template>

<style lang="css" scoped></style>
