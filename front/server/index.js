const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

// Import and Set Nuxt.js options


const config = app.env !== 'production' ?
  require('../nuxt.config.js') : require('../nuxt.config.prod.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || 'localhost',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })

}

start()
