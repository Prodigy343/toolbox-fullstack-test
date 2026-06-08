import Table from 'react-bootstrap/Table'

function FilesTable({ files }) {
  const rows = files.flatMap((entry) =>
    entry.lines.map((line, index) => ({
      key: `${entry.file}-${index}`,
      file: entry.file,
      ...line
    }))
  )

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.key}>
            <td>{row.file}</td>
            <td>{row.text}</td>
            <td>{row.number}</td>
            <td>{row.hex}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default FilesTable
