import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { fetchFilesData, fetchFilesList } from './api/filesApi'
import FilesTable from './components/FilesTable'
import FileFilter from './components/FileFilter'

function App() {
  const [fileNames, setFileNames] = useState([])
  const [selected, setSelected] = useState('')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    fetchFilesList()
      .then((names) => {
        if (active) setFileNames(names)
      })
      .catch(() => { })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)

    fetchFilesData(selected || undefined)
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
  }, [selected])

  return (
    <>
      <header className='app-banner'>
        <h1>React Test App</h1>
      </header>
      <Container className='pb-4'>
        <div className='mb-3' style={{ maxWidth: 320 }}>
          <FileFilter files={fileNames} value={selected} onChange={setSelected} />
        </div>
        {loading && <Spinner animation='border' role='status' />}
        {error && <Alert variant='danger'>{error}</Alert>}
        {!loading && !error &&
          (files.length > 0 ? (
            <FilesTable files={files} />
          ) : (
            <Alert variant='danger'>
              {selected
                ? `No data available for ${selected}`
                : 'No files with data available.'}
            </Alert>
          ))}
      </Container>
    </>
  )
}

export default App
