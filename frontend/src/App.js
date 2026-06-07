import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { fetchFilesData } from './api/filesApi'
import FilesTable from './components/FilesTable'

function App() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    fetchFilesData()
      .then((data) => {
        if (active) {
          setFiles(data)
          setError(null)
        }
      })
      .catch((err) => {
        if (active) setError(err.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <Container className='py-4'>
      <h1 className='mb-4'>React Test App</h1>
      {loading && <Spinner animation='border' role='status' />}
      {error && <Alert variant='danger'>{error}</Alert>}
      {!loading && !error && <FilesTable files={files} />}
    </Container>
  )
}

export default App
