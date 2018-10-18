module.exports = ({
  pdfService
}) => {
  return {
    method: 'GET',
    path: '/api/v1/pdf/download/{id}',
    config: {
      handler (request, h) {
        const { id } = request.params

        const file = pdfService.downloadPdf(id)

        return h.response(file.content)
                .type('Content-Type', 'application/octet-stream')
                .header('Content-Disposition', `attachment; filename=${file.fileName};`)
      }
    }
  }
}
