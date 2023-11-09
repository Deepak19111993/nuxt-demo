export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('token');

    const isLoggedIn = token ? true : false;

    if (!isLoggedIn && to.path !== '/login') {
      // return navigateTo('/login');
      return window.location.replace('/login');
    } else if (isLoggedIn && to.path === '/login') {
      // return navigateTo('/home');
      return window.location.replace('/home');
    }
  }
});
