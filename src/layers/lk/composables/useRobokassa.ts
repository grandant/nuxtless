export const useRobokassa = () => {
  // Подключаем скрипт Robokassa глобально через useHead
  // Он загрузится один раз при вызове composable
  useHead({
    script: [
      {
        src: 'https://auth.robokassa.ru/Merchant/bundle/robokassa_iframe.js',
        async: true,
        tagPosition: 'bodyClose'
      }
    ]
  })

  const robokassaStartPayment = (params) => {
    if (typeof window !== 'undefined' && (window as any).Robokassa) {
      (window as any).Robokassa.StartPayment(params);
    } else {
      console.error('Robokassa SDK не загружен. Попробуйте еще раз через секунду.');
      // Можно добавить логику уведомления пользователя через Nuxt UI Toast
    }
  }

  return {
    robokassaStartPayment
  }
}
