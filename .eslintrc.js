module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'vue/no-mutating-props': 'off',
  },
  overrides: [
    {
      files: ['*.json'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'no-use-before-define': 'off',
      },
    },
  ],
}
