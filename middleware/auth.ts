import { Middleware } from '@nuxt/types'

const auth: Middleware = ({ redirect, app }) => {
  if (!app.$auth.loggedIn) {
    redirect(app.localePath('/'))
  }
}

export default auth
