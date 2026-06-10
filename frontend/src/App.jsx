import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { fetchFilesData, fetchFilesList } from './api/filesApi'
import FilesTable from './components/FilesTable'
import FileFilter from './components/FileFilter'
import { setSelected, setFileNames, loadStart, loadSuccess, loadFailure } from './store/filesSlice'

function App() {
  const dispatch = useDispatch()
  const { items, fileNames, selected, loading, error } = useSelector((state) => state.files)

  useEffect(() => {
    let active = true

    fetchFilesList()
      .then((names) => {
        if (active) dispatch(setFileNames(names))
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [dispatch])

  useEffect(() => {
    let active = true
    dispatch(loadStart())

    fetchFilesData(selected || undefined)
      .then((data) => {
        if (active) dispatch(loadSuccess(data))
      })
      .catch((err) => {
        if (active) dispatch(loadFailure(err.message))
      })

    return () => {
      active = false
    }
  }, [dispatch, selected])

  return (
    <>
      <header className='app-banner'>
        <h1>React Test App</h1>
      </header>
      <Container className='pb-4'>
        <div className='mb-3' style={{ maxWidth: 320 }}>
          <FileFilter files={fileNames} value={selected} onChange={(value) => dispatch(setSelected(value))} />
        </div>
        {loading && <Spinner animation='border' role='status' />}
        {error && <Alert variant='danger'>{error}</Alert>}
        {!loading && !error &&
          (items.length > 0 ? (
            <FilesTable files={items} />
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
