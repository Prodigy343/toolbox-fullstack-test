import Form from 'react-bootstrap/Form'

function FileFilter({ files, value, onChange }) {
  return (
    <Form.Group controlId='fileFilter' className='d-flex align-items-center gap-2'>
      <Form.Label className='mb-0 text-nowrap'>File</Form.Label>
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
