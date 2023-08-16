export const auth = {
  // redirect: false,
  // redirect: {
  //   login: '/login',
  //   logout: '/',
  //   callback: '/login',
  //   home: '/',
  // },
  redirect: false,
  strategies: {
    local: {
      token: {
        property: 'meta.token',
      },
      user: {
        property: 'data',
      },
      endpoints: {
        login: { url: '/client-login', method: 'post' },
        user: { url: '/client-profile', method: 'get' },
        logout: { url: 'logout', method: 'post' },
      },
    },
  },
}
