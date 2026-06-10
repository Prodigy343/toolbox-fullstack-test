'use strict'

const { expect } = require('chai')
const { parseCsv } = require('../src/services/csvParser')

const HEX = '70ad29aacf0b690b0467fe2b2767f765'

describe('parseCsv', () => {
  it('parses valid lines and types number as a Number', () => {
    const result = parseCsv(`file,text,number,hex\nf.csv,Hello,42,${HEX}`)

    expect(result).to.deep.equal([{ text: 'Hello', number: 42, hex: HEX }])
    expect(result[0].number).to.be.a('number')
  })

  it('discards lines with wrong column count, non-numeric number, or invalid hex', () => {
    const csv = [
      'file,text,number,hex',
      'f.csv,missing,columns',
      `f.csv,bad,notanumber,${HEX}`,
      'f.csv,bad,1,zzz'
    ].join('\n')

    expect(parseCsv(csv)).to.deep.equal([])
  })

  it('returns an empty array for empty, header-only, or blank content', () => {
    expect(parseCsv('')).to.deep.equal([])
    expect(parseCsv('file,text,number,hex')).to.deep.equal([])
    expect(parseCsv('file,text,number,hex\n\n   \n')).to.deep.equal([])
  })
})
