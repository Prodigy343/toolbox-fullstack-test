'use strict'

const express = require('express')
const { getFilesData } = require('../services/filesService')
const externalApi = require('../services/externalApi')
const router = express.Router()

router.get('/data', async (req, res, next) => {
  try {
    const data = await getFilesData(req.query.fileName)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/list', async (_, res, next) => {
  try {
    const files = await externalApi.listFiles()
    res.json({ files })
  } catch (err) {
    next(err)
  }
})

module.exports = router
