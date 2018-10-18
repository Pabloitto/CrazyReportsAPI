const Hapi = require('hapi')

const server = Hapi.server({
  port: 5000,
  host: '0.0.0.0'
})

const { mainPlugin, routes } = require('./setup')

const Server = () => {
  const start = async () => {
    try {
      await server.register([ mainPlugin, ...routes ])
      await server.start()
      console.log('Server running at:', server.info.uri)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    start
  }
}

module.exports = {
  Server
}
