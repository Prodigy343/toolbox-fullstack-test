'use strict'

module.exports = {
  port: process.env.PORT || 3000,
  externalApi: {
    baseUrl: process.env.EXTERNAL_API_URL || 'https://echo-serv.tbxnet.com/v1/secret',
    apiKey: process.env.EXTERNAL_API_KEY || 'aSuperSecretKey'
  }
}
