// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    // SCSS file in the project
    '~/assets/scss/variable.scss',
    '~/assets/scss/global.scss',
    '~/assets/scss/header.scss',
    '~/assets/scss/footer.scss',
  ],
});
