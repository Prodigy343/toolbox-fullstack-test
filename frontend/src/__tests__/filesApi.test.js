import { fetchFilesData, fetchFilesList } from '../api/filesApi'

describe('fetchFilesData', () => {
  afterEach(() => {
    delete global.fetch
  })

  it('requests /files/data with no query when no fileName is given', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [] })

    await fetchFilesData()

    expect(global.fetch).toHaveBeenCalledWith('/files/data')
  })

  it('appends an encoded fileName query when provided', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [] })

    await fetchFilesData('test 1.csv')

    expect(global.fetch).toHaveBeenCalledWith('/files/data?fileName=test%201.csv')
  })

  it('returns the parsed JSON body on success', async () => {
    const body = [{ file: 'test2.csv', lines: [] }]
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => body })

    await expect(fetchFilesData()).resolves.toEqual(body)
  })

  it('throws when the response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 })

    await expect(fetchFilesData()).rejects.toThrow('Request failed with status 500')
  })
})

describe('fetchFilesList', () => {
  afterEach(() => {
    delete global.fetch
  })

  it('requests /files/list and returns the files array', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ files: ['a.csv', 'b.csv'] })
    })

    await expect(fetchFilesList()).resolves.toEqual(['a.csv', 'b.csv'])
    expect(global.fetch).toHaveBeenCalledWith('/files/list')
  })

  it('throws when the response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 })

    await expect(fetchFilesList()).rejects.toThrow('Request failed with status 500')
  })
})
