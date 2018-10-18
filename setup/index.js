const { Container } = require('samurai-inject')

const modules = [
  require('../src/api/pdf')
]

const setup = () => {
  const container = Container()

  modules.forEach(route => route.register(container))

  return container
}

const mainPlugin = {
  name: 'mainPlugin',
  register (server) {
    server.decorate('server', 'container', setup())
  }
}

const routes = modules.map(route => route.routes)

module.exports = {
  mainPlugin,
  routes
}
