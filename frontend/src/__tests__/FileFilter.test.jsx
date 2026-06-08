import { render, screen, fireEvent } from '@testing-library/react'
import FileFilter from '../components/FileFilter'

describe('FileFilter', () => {
  it('renders an "All files" option plus one per file', () => {
    render(<FileFilter files={['a.csv', 'b.csv']} value='' onChange={() => {}} />)

    expect(screen.getByRole('option', { name: 'All files' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'a.csv' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'b.csv' })).toBeInTheDocument()
  })

  it('calls onChange with the selected file name', () => {
    const onChange = jest.fn()
    render(<FileFilter files={['a.csv', 'b.csv']} value='' onChange={onChange} />)

    fireEvent.change(screen.getByRole('combobox', { name: 'Filter by file' }), {
      target: { value: 'b.csv' }
    })

    expect(onChange).toHaveBeenCalledWith('b.csv')
  })
})
