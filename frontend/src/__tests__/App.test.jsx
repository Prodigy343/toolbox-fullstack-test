import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../App'
import { fetchFilesData, fetchFilesList } from '../api/filesApi'

jest.mock('../api/filesApi')

const sample = [
  {
    file: 'test2.csv',
    lines: [{ text: 'abc', number: 772, hex: 'd2f4beb426e2c0d39f4a54eef4c558e0' }]
  }
]

describe('App', () => {
  beforeEach(() => {
    fetchFilesList.mockResolvedValue(['test2.csv', 'test3.csv'])
  })

  afterEach(() => jest.resetAllMocks())

  it('always renders the page title', () => {
    fetchFilesData.mockReturnValue(new Promise(() => {}))
    fetchFilesList.mockReturnValue(new Promise(() => {}))
    render(<App />)

    expect(screen.getByText('React Test App')).toBeInTheDocument()
  })

  it('shows a spinner while loading', () => {
    fetchFilesData.mockReturnValue(new Promise(() => {}))
    fetchFilesList.mockReturnValue(new Promise(() => {}))
    render(<App />)

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders the table once data resolves', async () => {
    fetchFilesData.mockResolvedValue(sample)
    render(<App />)

    expect(await screen.findByRole('cell', { name: 'test2.csv' })).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows an error alert when the fetch fails', async () => {
    fetchFilesData.mockRejectedValue(new Error('Boom'))
    render(<App />)

    expect(await screen.findByRole('alert')).toHaveTextContent('Boom')
  })

  it('populates the filter from the list and refetches on change', async () => {
    fetchFilesData.mockResolvedValue(sample)
    render(<App />)

    const select = await screen.findByRole('combobox', { name: 'Filter by file' })
    await screen.findByRole('option', { name: 'test3.csv' })

    fetchFilesData.mockResolvedValue([])
    fireEvent.change(select, { target: { value: 'test3.csv' } })

    await waitFor(() => expect(fetchFilesData).toHaveBeenCalledWith('test3.csv'))
  })

  it('shows an empty-state message when there is no data', async () => {
    fetchFilesData.mockResolvedValue([])
    render(<App />)

    expect(await screen.findByText('No files with data available.')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('shows a per-file empty message when the picked file has no data', async () => {
    fetchFilesData.mockResolvedValueOnce(sample)
    render(<App />)
    const select = await screen.findByRole('combobox', { name: 'Filter by file' })
    await screen.findByRole('option', { name: 'test3.csv' })

    fetchFilesData.mockResolvedValueOnce([])
    fireEvent.change(select, { target: { value: 'test3.csv' } })

    expect(await screen.findByText('No data available for test3.csv.')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
