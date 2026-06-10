import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from '../App'
import filesReducer from '../store/filesSlice'
import { fetchFilesData, fetchFilesList } from '../api/filesApi'

jest.mock('../api/filesApi')

const sample = [
  {
    file: 'test2.csv',
    lines: [{ text: 'abc', number: 772, hex: 'd2f4beb426e2c0d39f4a54eef4c558e0' }]
  }
]

const renderApp = () => {
  const store = configureStore({ reducer: { files: filesReducer } })
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

describe('App', () => {
  beforeEach(() => {
    fetchFilesList.mockResolvedValue(['test2.csv', 'test3.csv'])
  })

  afterEach(() => jest.resetAllMocks())

  it('renders the title and the table once data loads', async () => {
    fetchFilesData.mockResolvedValue(sample)
    renderApp()

    expect(screen.getByText('React Test App')).toBeInTheDocument()
    expect(await screen.findByRole('cell', { name: 'test2.csv' })).toBeInTheDocument()
  })

  it('shows an error alert when the fetch fails', async () => {
    fetchFilesData.mockRejectedValue(new Error('Boom'))
    renderApp()

    expect(await screen.findByRole('alert')).toHaveTextContent('Boom')
  })

  it('refetches and shows an empty message when a picked file has no data', async () => {
    fetchFilesData.mockResolvedValueOnce(sample)
    renderApp()
    const select = await screen.findByRole('combobox', { name: 'File' })
    await screen.findByRole('option', { name: 'test3.csv' })

    fetchFilesData.mockResolvedValueOnce([])
    fireEvent.change(select, { target: { value: 'test3.csv' } })

    expect(await screen.findByText('No data available for test3.csv')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
