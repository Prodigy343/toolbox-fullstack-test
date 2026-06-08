import Form from 'react-bootstrap/Form'

function FileFilter ({ files, value, onChange }) {
  return (
    <Form.Group controlId='fileFilter'>
      <Form.Label>Filter by file</Form.Label>
      <Form.Select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value=''>All files</option>
        {files.map((file) => (
          <option key={file} value={file}>
            {file}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default FileFilter
