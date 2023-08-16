export const i18n = {
  vueI18nLoader: true,
  defaultLocale: 'default',
  localeDetection: false,
  langDir: 'locales/',
  locales: [
    {
      name: 'English',
      code: 'en',
      iso: 'en-US',
      file: 'en.json',
      dir: 'ltr',
    },
    {
      name: 'عربي',
      code: 'ar',
      iso: 'ar-EG',
      file: 'ar.json',
      dir: 'rtl',
    },
  ],
  vueI18n: {
    locale: 'en',
    fallbackLocale: 'en',
  },
}
