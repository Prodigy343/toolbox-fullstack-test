'use strict'

const externalApi = require('./externalApi')
const { parseCsv } = require('./csvParser')

async function getFilesData(fileNameFilter) {
  let files = await externalApi.listFiles()

  if (fileNameFilter) {
    files = files.filter((name) => name === fileNameFilter)
  }

  const entries = await Promise.all(files.map(async (file) => {
    try {
      const raw = await externalApi.downloadFile(file)
      return { file, lines: parseCsv(raw) }
    } catch (err) {
      return null
    }
  }))

  return entries.filter((entry) => entry && entry.lines.length > 0)
}

module.exports = { getFilesData }
