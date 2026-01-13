<script setup lang="ts" size="xl">
import { ContactForm } from "~~/src/layers/lk/validators/ContactForm";

import type { FormSubmitEvent } from "@nuxt/ui";

const { t } = useI18n();
const localePath = useLocalePath();
const toast = useToast();
const { updateCustomer } = useCustomerStore();

const state = reactive({
  phoneNumber: "",
  city:'',
  countryCode:'RU',
  socialList:{
    TG:'',
    WT:'',
    MAX:'',
    VK:'',
    OTHER:''
  }
});

const { data: countriesData } = await useAsyncGql("GetChannelCountries");

const countries = computed(
  () =>
    countriesData.value?.activeChannel?.defaultShippingZone?.members.map(
      (c) => ({
        label: c.name,
        code: c.code,
      }),
    ) ?? [],
);

async function onSubmit(event: FormSubmitEvent<ContactForm>) {
  const result = await updateCustomer({
    phoneNumber: event.data.phoneNumber,
    customFields: {
      city: event.data.city,
      countryCode: event.data.countryCode,
      socialList:Object.entries(event.data.socialList)
        .filter(([_, value]) => value) // Фильтруем только заполненные поля
        .map(([key, value]) => ({
          socialType: key, // 'VK', 'TG' и т.д.
          profile: value
        }))
    }
  });
  console.log(result);
  if (result) {
    toast.add({
      title: t("messages.general.success"),
      description: t("messages.general.success"),
      color: "success",
    });
  } else {
    toast.add({
      title: t("messages.error.general"),
      description: t("messages.error.generalMessage"),
      color: "error",
    });
  }
}
</script>

<template>
  <UForm
    :schema="ContactForm"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >

      <UFormField
        :label="t('messages.account.phoneNumber')"
        name="phoneNumber"
        size="xl"
        description="Чтобы отправить заявку, пожалуйста укажите свой телефон."
      >
        <UInput v-model="state.phoneNumber" class="w-full" type="text" />
      </UFormField>

      <h2 class="text-lg font-semibold">Предпочитаемый канал связи</h2>
      <UFormField
        :label="'Телеграм'"
        name="TG"
        size="xl"

        description="Введите свой логин телеграм или оставьте поле пустым если вас можно найти в телеграме только по телефону"
      >
        <UInput v-model="state.socialList.TG" class="w-full" type="text" />
      </UFormField>


      <UFormField
        :label="'WhatsApp'"
        name="WT"
        size="xl"

        description="Введите телефон если WhatsApp привязан к другому номеру"
      >
        <UInput v-model="state.socialList.WT" class="w-full" type="text" />
      </UFormField>

      <UFormField
        :label="'Вконтакте'"
        name="VK"
        size="xl"

        description="Введите адрес своей страницы Вконтакте"
      >
        <UInput v-model="state.socialList.VK" class="w-full" type="text" />
      </UFormField>

      <UFormField
        :label="'Свой вариант'"
        name="OTHER"
        size="xl"
      >
        <UInput v-model="state.socialList.OTHER" class="w-full" type="text" />
      </UFormField>

      <UFormField
        :label="t('messages.billing.city')"
        name="city"
        size="xl"
        description="Это поможет нам выбрать оптимальное время для оповещений о подписке"
      >
        <UInput v-model="state.city" class="w-full" type="text" />
      </UFormField>


      <UFormField
        :label="t('messages.billing.country')"
        name="country"
        size="xl"
      >
        <USelectMenu
          v-model="state.countryCode"
          value-key="code"
          :items="[countries]"
          class="w-full"
        />
      </UFormField>

      <p>
        Для подключения вам понадобится пол часа свободного времени.

        Вся процедура подключения проходит дистанционно, созваниваться для этого не нужно.

        После отправки заявки наш сотрудник напишет вам в течение следующего для,

        договорится о времени подключения и даст рекомендации по использованию потоков.
      </p>


    <UButton size="xl" loading-auto class="w-full justify-center" type="submit">
      {{ t("messages.general.submit") }}
    </UButton>
  </UForm>
</template>

<style lang="css" scoped></style>
