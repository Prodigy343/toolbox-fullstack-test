import { render, screen } from '@testing-library/react'
import App from '../App'
import { fetchFilesData } from '../api/filesApi'

jest.mock('../api/filesApi')

const sample = [
  {
    file: 'test2.csv',
    lines: [{ text: 'abc', number: 772, hex: 'd2f4beb426e2c0d39f4a54eef4c558e0' }]
  }
]

describe('App', () => {
  afterEach(() => jest.resetAllMocks())

  it('always renders the page title', () => {
    fetchFilesData.mockReturnValue(new Promise(() => {}))
    render(<App />)

    expect(screen.getByText('React Test App')).toBeInTheDocument()
  })

  it('shows a spinner while loading', () => {
    fetchFilesData.mockReturnValue(new Promise(() => {}))
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
})
