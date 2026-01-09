export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const publicRoutes = [
    '/account/login',
    '/account/register',
    '/account/request-password-reset',
    '/auth/callback'
  ]; // Добавьте сюда публичные маршруты

  // Если пользователь не аутентифицирован и пытается перейти на защищенный маршрут
  if (!authStore.isAuthenticated && !publicRoutes.includes(to.path)) {
    return navigateTo('/account/login');
  }

  // Если пользователь аутентифицирован и пытается перейти на страницу входа/регистрации
  if (authStore.isAuthenticated && (to.path === '/account/login' || to.path === '/account/register')) {
    return navigateTo('/');
  }
});
