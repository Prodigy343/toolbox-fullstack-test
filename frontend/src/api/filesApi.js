const API_BASE = ''

export async function fetchFilesData(fileName) {
  const query = fileName ? `?fileName=${encodeURIComponent(fileName)}` : ''
  const res = await fetch(`${API_BASE}/files/data${query}`)
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  return res.json()
}
