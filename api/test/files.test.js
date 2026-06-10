'use strict'

const { URL } = require('url')
const { expect } = require('chai')
const request = require('supertest')
const nock = require('nock')

const app = require('../src/app')
const config = require('../src/config')

const base = new URL(config.externalApi.baseUrl)
const ORIGIN = base.origin
const PREFIX = base.pathname
const HEX = '70ad29aacf0b690b0467fe2b2767f765'

describe('GET /files/data', () => {
  afterEach(() => nock.cleanAll())

  it('returns JSON and formats the valid lines, discarding invalid ones', async () => {
    const csv = [
      'file,text,number,hex',
      `file1.csv,RgTya,64075909,${HEX}`,
      'file1.csv,bad,line'
    ].join('\n')
    nock(ORIGIN).get(`${PREFIX}/files`).reply(200, { files: ['file1.csv'] })
    nock(ORIGIN).get(`${PREFIX}/file/file1.csv`).reply(200, csv)

    const res = await request(app).get('/files/data').expect('Content-Type', /json/).expect(200)

    expect(res.body).to.be.an('array').with.lengthOf(1)
    expect(res.body[0]).to.deep.equal({
      file: 'file1.csv',
      lines: [{ text: 'RgTya', number: 64075909, hex: HEX }]
    })
  })

  it('omits files that download but contain no valid lines', async () => {
    nock(ORIGIN).get(`${PREFIX}/files`).reply(200, { files: ['empty.csv', 'good.csv'] })
    nock(ORIGIN).get(`${PREFIX}/file/empty.csv`).reply(200, 'file,text,number,hex')
    nock(ORIGIN).get(`${PREFIX}/file/good.csv`).reply(200, `file,text,number,hex\ngood.csv,Ok,1,${HEX}`)

    const res = await request(app).get('/files/data').expect(200)

    expect(res.body).to.have.lengthOf(1)
    expect(res.body[0].file).to.equal('good.csv')
  })

  it('skips files that fail to download', async () => {
    nock(ORIGIN).get(`${PREFIX}/files`).reply(200, { files: ['good.csv', 'broken.csv'] })
    nock(ORIGIN).get(`${PREFIX}/file/good.csv`).reply(200, `file,text,number,hex\ngood.csv,Ok,1,${HEX}`)
    nock(ORIGIN).get(`${PREFIX}/file/broken.csv`).reply(500)

    const res = await request(app).get('/files/data').expect(200)

    expect(res.body).to.have.lengthOf(1)
    expect(res.body[0].file).to.equal('good.csv')
  })

  it('fetches a single file directly when ?fileName= is given', async () => {
    nock(ORIGIN).get(`${PREFIX}/file/file2.csv`).reply(200, `file,text,number,hex\nfile2.csv,Hello,2,${HEX}`)

    const res = await request(app).get('/files/data?fileName=file2.csv').expect(200)

    expect(res.body).to.have.lengthOf(1)
    expect(res.body[0].file).to.equal('file2.csv')
  })

  it('responds 500 with a JSON error when the external API fails', async () => {
    nock(ORIGIN).get(`${PREFIX}/files`).reply(500)

    const res = await request(app).get('/files/data').expect('Content-Type', /json/).expect(500)

    expect(res.body).to.have.property('error')
  })
})

describe('GET /files/list', () => {
  afterEach(() => nock.cleanAll())

  it('returns the raw list of files from the external API', async () => {
    nock(ORIGIN).get(`${PREFIX}/files`).reply(200, { files: ['a.csv', 'b.csv'] })

    const res = await request(app).get('/files/list').expect(200)

    expect(res.body).to.deep.equal({ files: ['a.csv', 'b.csv'] })
  })
})
