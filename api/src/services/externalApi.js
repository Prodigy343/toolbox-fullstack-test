'use strict'

const fetch = require('node-fetch')
const config = require('../config')

const authHeaders = {
  authorization: `Bearer ${config.externalApi.apiKey}`
}

async function listFiles () {
  const res = await fetch(`${config.externalApi.baseUrl}/files`, { headers: authHeaders })
  if (!res.ok) {
    throw new Error(`Failed to list files (status ${res.status})`)
  }
  const body = await res.json()
  return Array.isArray(body.files) ? body.files : []
}

async function downloadFile (fileName) {
  const res = await fetch(`${config.externalApi.baseUrl}/file/${fileName}`, { headers: authHeaders })
  if (!res.ok) {
    throw new Error(`Failed to download "${fileName}" (status ${res.status})`)
  }
  return res.text()
}

module.exports = { listFiles, downloadFile }
