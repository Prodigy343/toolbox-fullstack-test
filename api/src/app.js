'use strict'

const express = require('express')
const cors = require('cors')
const filesRouter = require('./routes/files')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', filesRouter)
app.use((err, _, res, __) => {
  res.status(500).json({ error: err.message })
})

module.exports = app
