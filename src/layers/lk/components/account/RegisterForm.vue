<script setup lang="ts" size="xl">
import { RegisterForm } from "~~/src/layers/lk/validators/registerForm";

import type { FormSubmitEvent } from "@nuxt/ui";

const { t } = useI18n();
const localePath = useLocalePath();
const toast = useToast();
const { register } = useCustomerStore();

const state = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",

  phoneNumber: "",
  city:"",
  countryCode:"RU",
  socialList:{
    TG:"",
    WT:"",
    MAX:"",
    VK:"",
    OTHER:""
  }
});

async function onSubmit(event: FormSubmitEvent<RegisterForm>) {
  const result = await register({
    firstName: event.data.firstName,
    lastName: event.data.lastName,
    emailAddress: event.data.email,
    password: event.data.password,

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

  if (result && "success" in result && result.success) {
    await navigateTo(localePath("/account/login"), { replace: true });
    toast.add({
      title: t("messages.account.registerSuccess"),
      description: t("messages.account.registerSuccessMessage"),
      color: "success",
    });
  } else if (result && "message" in result) {
    toast.add({
      title: t("messages.account.registerFail"),
      description: result.message,
      color: "error",
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
    :schema="RegisterForm"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >


    <UFormField
      :label="t('messages.account.firstName')"
      name="firstName"
      size="xl"
    >
      <UInput
        v-model="state.firstName"
        type="text"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="t('messages.account.lastName')"
      name="lastName"
      size="xl"
    >
      <UInput
        v-model="state.lastName"
        type="text"
        class="w-full"
      />
    </UFormField>

    <!--lk logic-->

    <UFormField
      :label="t('messages.account.phoneNumber')"
      name="phoneNumber"
      size="xl"
    >
      <UInput placeholder="89991112334" v-model="state.phoneNumber" class="w-full" type="text" />
    </UFormField>

    <h2 class="text-lg font-semibold">Укажите предпочитаемый канал связи</h2>
    <UFormField
      :label="'Телеграм'"
      name="TG"
      size="xl"
    >
      <UInput placeholder="Ваш логин или телефон" v-model="state.socialList.TG" class="w-full" type="text" />
    </UFormField>


    <UFormField
      :label="'WhatsApp'"
      name="WT"
      size="xl"

    >
      <UInput placeholder="Ваш телефон" v-model="state.socialList.WT" class="w-full" type="text" />
    </UFormField>

    <UFormField
      :label="'Вконтакте'"
      name="VK"
      size="xl"
    >
      <UInput placeholder="Ваша страница Вконтакте" v-model="state.socialList.VK" class="w-full" type="text" />
    </UFormField>

    <UFormField
      :label="'Max'"
      name="Max"
      size="xl"
    >
      <UInput placeholder="Ваш телефон"  v-model="state.socialList.MAX" class="w-full" type="text" />
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
        :items="[{
            label: 'Россия',
            code: 'RU'
          },{
            label: 'Другая',
            code: 'OTHER'
          }]"
        class="w-full"
      />
    </UFormField>



    <!--lk logic-->

    <UFormField :label="t('messages.account.email')" name="email" size="xl">
      <UInput
        v-model="state.email"
        type="email"
        :placeholder="t('messages.account.emailPlaceholder')"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="t('messages.account.password')"
      name="password"
      size="xl"
    >
      <UInput
        v-model="state.password"
        type="password"
        :placeholder="t('messages.account.enterPassword')"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="t('messages.account.confirmPassword')"
      name="confirmPassword"
      size="xl"
    >
      <UInput
        v-model="state.confirmPassword"
        type="password"
        :placeholder="t('messages.account.confirmPassword')"
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
      {{ t("messages.account.register") }}
    </UButton>
  </UForm>
</template>

<style lang="css" scoped></style>
