'use strict'

const { URL } = require('url')
const { expect } = require('chai')
const request = require('supertest')
const nock = require('nock')

const app = require('../src/app')
const config = require('../src/config')

// Split the configured base URL into origin + path so nock can intercept it.
const base = new URL(config.externalApi.baseUrl)
const ORIGIN = base.origin // e.g. https://echo-serv.tbxnet.com
const PREFIX = base.pathname // e.g. /v1/secret

describe('GET /files/data', () => {
  afterEach(() => nock.cleanAll())

  it('returns formatted, validated lines per file', async () => {
    const csv = [
      'file,text,number,hex',
      'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765',
      'file1.csv,bad,line', // discarded: too few columns
      'file1.csv,Nope,notanumber,70ad29aacf0b690b0467fe2b2767f765', // discarded: number
      'file1.csv,Nope,1,zzz', // discarded: invalid hex
      '' // discarded: empty line
    ].join('\n')

    nock(ORIGIN).get(`${PREFIX}/files`).reply(200, { files: ['file1.csv'] })
    nock(ORIGIN).get(`${PREFIX}/file/file1.csv`).reply(200, csv)

    const res = await request(app).get('/files/data').expect('Content-Type', /json/).expect(200)

    expect(res.body).to.be.an('array').with.lengthOf(1)
    expect(res.body[0].file).to.equal('file1.csv')
    expect(res.body[0].lines).to.have.lengthOf(1)
    expect(res.body[0].lines[0]).to.deep.equal({
      text: 'RgTya',
      number: 64075909,
      hex: '70ad29aacf0b690b0467fe2b2767f765'
    })
  })

  it('skips files that fail to download', async () => {
    nock(ORIGIN).get(`${PREFIX}/files`).reply(200, { files: ['file1.csv', 'broken.csv'] })
    nock(ORIGIN).get(`${PREFIX}/file/file1.csv`).reply(200,
      'file,text,number,hex\nfile1.csv,Ok,1,70ad29aacf0b690b0467fe2b2767f765')
    nock(ORIGIN).get(`${PREFIX}/file/broken.csv`).reply(500)

    const res = await request(app).get('/files/data').expect(200)

    expect(res.body).to.have.lengthOf(1)
    expect(res.body[0].file).to.equal('file1.csv')
  })

  it('supports the optional ?fileName= filter', async () => {
    nock(ORIGIN).get(`${PREFIX}/files`).reply(200, { files: ['file1.csv', 'file2.csv'] })
    nock(ORIGIN).get(`${PREFIX}/file/file2.csv`).reply(200,
      'file,text,number,hex\nfile2.csv,Hello,2,70ad29aacf0b690b0467fe2b2767f765')

    const res = await request(app).get('/files/data?fileName=file2.csv').expect(200)

    expect(res.body).to.have.lengthOf(1)
    expect(res.body[0].file).to.equal('file2.csv')
  })
})
