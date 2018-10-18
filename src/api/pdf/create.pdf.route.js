module.exports = ({
  pdfService
}) => {
  return {
    method: 'POST',
    path: '/api/v1/pdf/create',
    config: {
      async handler ({ payload }) {
        try {
          const { id } = await pdfService.createPdf(payload)

          return {
            success: true,
            url: `/api/v1/pdf/download/${id}`
          }
        } catch (err) {
          console.error('Fail', err)
          return {
            success: false
          }
        }
      }
    }
  }
}
