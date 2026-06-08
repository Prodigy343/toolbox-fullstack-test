import { render, screen } from '@testing-library/react'
import FilesTable from '../components/FilesTable'

const files = [
  {
    file: 'test2.csv',
    lines: [{ text: 'abc', number: 772, hex: 'd2f4beb426e2c0d39f4a54eef4c558e0' }]
  },
  {
    file: 'test3.csv',
    lines: [
      { text: 'def', number: 11471268, hex: 'e6dc4724300243614501c6a5d9c4cb87' },
      { text: 'ghi', number: 616614, hex: '1e100f78eec20cf5cb3f067fb2309301' }
    ]
  }
]

describe('FilesTable', () => {
  it('renders the four column headers', () => {
    render(<FilesTable files={[]} />)

    for (const header of ['File Name', 'Text', 'Number', 'Hex']) {
      expect(screen.getByRole('columnheader', { name: header })).toBeInTheDocument()
    }
  })

  it('renders one row per line, flattened across files', () => {
    render(<FilesTable files={files} />)

    const dataRows = files.reduce((total, file) => total + file.lines.length, 0)
    expect(screen.getAllByRole('row')).toHaveLength(dataRows + 1)
  })

  it('repeats the file name on each of its rows', () => {
    render(<FilesTable files={files} />)

    expect(screen.getAllByRole('cell', { name: 'test3.csv' })).toHaveLength(2)
    expect(
      screen.getByRole('cell', { name: 'd2f4beb426e2c0d39f4a54eef4c558e0' })
    ).toBeInTheDocument()
  })

  it('renders only the header row when there are no files', () => {
    render(<FilesTable files={[]} />)

    expect(screen.getAllByRole('row')).toHaveLength(1)
  })
})
