const uuid = require('uuid')

const fs = require('fs')

const puppeteer = require('puppeteer')

const runMode = async (page, mode, target) => {
  return {
    web: () => {
      return page.goto(target, {
        waitUntil: 'networkidle2'
      })
    },
    html: () => {
      return page.setContent(target)
    }
  }[mode]()
}

const createPdfFile = async ({
  mode,
  target,
  filePath
}) => {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()

  await runMode(page, mode, target)

  await page.emulateMedia('screen')

  await page.pdf({
    path: filePath,
    format: 'A3',
    preferCSSPageSize: true,
    printBackground: true
  })

  await browser.close()
}

const PdfService = () => {
  const createPdf = async ({ mode, target }) => {
    const uniqueId = uuid.v1()

    const path = `temp/${uniqueId}.pdf`

    await createPdfFile({ mode, target, filePath: path })

    return {
      id: uniqueId
    }
  }

  const downloadPdf = (uniqueId) => {
    const fileName = `${uniqueId}.pdf`
    return {
      fileName,
      content: fs.readFileSync(`temp/${fileName}`)
    }
  }

  return {
    createPdf,
    downloadPdf
  }
}

module.exports = {
  PdfService
}
