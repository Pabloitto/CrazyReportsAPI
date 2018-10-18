const register = (container) => {
  const { PdfService } = require('./pdf.service')

  container.register('pdfService', PdfService)

  container.register('createPdfRoute', require('./create.pdf.route'), ['pdfService'])
  container.register('downloadPdfRoute', require('./download.pdf.route'), ['pdfService'])
}

const pdfRoutes = {
  name: 'pdfRoutes',
  register (server) {
    const createPdfRoute = server.container.resolve('createPdfRoute')
    const downloadPdfRoute = server.container.resolve('downloadPdfRoute')
    server.route(createPdfRoute)
    server.route(downloadPdfRoute)
  }
}

module.exports = {
  routes: pdfRoutes,
  register
}
