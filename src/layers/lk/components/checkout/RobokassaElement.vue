<script setup lang="ts">
import type { CheckoutState } from "~~/src/types/general";

// 1. Используем стандартный useHead или Nuxt Scripts для загрузки Robokassa
useHead({
  script: [
    {
      src: 'https://auth.robokassa.ru/Merchant/bundle/robokassa_iframe.js',
      async: true
    }
  ]
});

const { order } = storeToRefs(useOrderStore());
const checkoutState = useState<CheckoutState>("checkoutState");

// Метод для запуска оплаты, который мы экспортируем (аналог submitStripePayment)
const submitRobokassaPayment = async () => {
  if (typeof window === 'undefined' || !(window as any).Robokassa) {
    console.error("Robokassa SDK не загружен");
    return;
  }

  // Получаем данные платежа (подпись и ID заказа) с вашего бэкенда через GraphQL
  // Предполагаем, что у вас есть аналогичный метод GqlCreateRobokassaIntent
  try {
    const { createRobokassaIntent } = await GqlCreateRobokassaPaymentIntent();

    if (createRobokassaIntent) {
      (window as any).Robokassa.StartPayment({
        MerchantLogin: createRobokassaIntent.merchantLogin,
        OutSum: createRobokassaIntent.amount,
        InvId: createRobokassaIntent.orderId,
        Description: `Оплата заказа №${createRobokassaIntent.orderId}`,
        Culture: useI18n().locale.value,
        Encoding: 'utf-8',
        SignatureValue: createRobokassaIntent.signature,
        // Если нужны кастомные параметры:
        // ...createRobokassaIntent.extraParams
      });
    }
  } catch (e) {
    console.error("Ошибка при создании платежа Robokassa:", e);
  }
};

// Экспортируем метод наружу, чтобы родитель (например, кнопка "Оформить") мог его вызвать
defineExpose({
  submitStripePayment: submitRobokassaPayment // сохраняем имя для совместимости или меняем на submitPayment
});

// Наблюдение за изменением суммы заказа (если нужно обновлять какие-то данные пре-чека)
const orderTotal = computed(() => order.value?.totalWithTax ?? 0);
watch(
  () => orderTotal.value,
  (n, o) => {
    if (n !== o) {
      console.log("Сумма изменилась, Robokassa подхватит актуальную сумму при вызове submit");
    }
  }
);
</script>

<template>
  <!-- У Robokassa нет внутренних элементов ввода, поэтому здесь может быть просто инфо-блок
       или пустой контейнер, если логика оплаты запускается по кнопке извне -->
  <div class="robokassa-payment-provider">
    <UAlert
      v-if="checkoutState.paymentForm.code === 'robokassa'"
      icon="i-heroicons-credit-card"
      title="Оплата через Robokassa"
      description="Вы будете перенаправлены на защищенную страницу оплаты."
      variant="subtle"
      color="primary"
    />
  </div>
</template>
