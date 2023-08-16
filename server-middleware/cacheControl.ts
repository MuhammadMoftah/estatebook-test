import { ServerMiddleware } from '@nuxt/types'

const cacheControl: ServerMiddleware = function (req, res, next) {
  const year = 31536000
  const hour = 60 * 60
  const url = req.url
  const maxage = url?.match(/(.+)\.(jpg|jpeg|gif|css|png|js|ico|svg|mjs)/)
    ? year
    : hour
  res.setHeader('Cache-Control', 'private, no-cache')
  next()
}

export default cacheControl
