import { fetchFilesData, fetchFilesList } from '../api/filesApi'

describe('filesApi', () => {
  afterEach(() => {
    delete global.fetch
  })

  it('requests /files/data, adding an encoded fileName query when filtering', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [] })

    await fetchFilesData()
    expect(global.fetch).toHaveBeenCalledWith('/files/data')

    await fetchFilesData('test 1.csv')
    expect(global.fetch).toHaveBeenCalledWith('/files/data?fileName=test%201.csv')
  })

  it('throws when a request is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 })

    await expect(fetchFilesData()).rejects.toThrow('Request failed with status 500')
  })

  it('fetchFilesList returns the files array from /files/list', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ files: ['a.csv', 'b.csv'] })
    })

    await expect(fetchFilesList()).resolves.toEqual(['a.csv', 'b.csv'])
    expect(global.fetch).toHaveBeenCalledWith('/files/list')
  })
})
