export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const publicRoutes = [
    '/verify',
    '/account/login',
    '/account/register',
    '/account/request-password-reset',
    '/auth/callback'
  ]; // Добавьте сюда публичные маршруты
  //@todo если пользователь разлогинится на странице / мидлвара не сработает
  // Если пользователь пришёл с /account/login на /account
  if (authStore.isAuthenticated && to.path === '/account' && from.path === '/account/login') {
    return navigateTo('/', { redirectCode: 301 });
  }

  // Если пользователь не аутентифицирован и пытается перейти на защищенный маршрут
  if (!authStore.isAuthenticated && !publicRoutes.includes(to.path)) {
    return navigateTo('/account/login');
  }

  // Если пользователь аутентифицирован и пытается перейти на страницу входа/регистрации
  if (authStore.isAuthenticated && (to.path === '/account/login' || to.path === '/account/register')) {
    return navigateTo('/');
  }
});
