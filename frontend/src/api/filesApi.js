const API_BASE = ''

async function request (path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  return res.json()
}

export async function fetchFilesData (fileName) {
  const query = fileName ? `?fileName=${encodeURIComponent(fileName)}` : ''
  return request(`/files/data${query}`)
}

export async function fetchFilesList () {
  const { files } = await request('/files/list')
  return files
}
