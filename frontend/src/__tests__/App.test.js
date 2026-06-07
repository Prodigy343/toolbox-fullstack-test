import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => []
    })
  })

  it('renders the page title', async () => {
    render(<App />)
    expect(await screen.findByText('React Test App')).toBeInTheDocument()
  })
})
