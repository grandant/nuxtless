<script setup lang="ts">
import type { ActiveCustomer } from "#layers/nuxtless/validators/customer";

const { t } = useI18n();

const { activeCustomer } = defineProps<{
  activeCustomer: ActiveCustomer;
}>();

const localePath = useLocalePath();
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">
      {{ t("messages.account.myAccount") }}
    </h1>
    <ULink :to="localePath('/account')" class="mt-2" aria-label="Account">
      {{ activeCustomer?.emailAddress }}
    </ULink>
  </div>
</template>

<style lang="css" scoped></style>
