import { fetchFilesData } from '../api/filesApi'

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
