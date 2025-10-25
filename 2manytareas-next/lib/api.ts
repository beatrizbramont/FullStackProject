export const API_URL = 'http://localhost:8001'  // Backend Flask

export async function getJSON(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`)
  if (!res.ok) throw new Error(`Erro na API: ${res.status}`)
  return res.json()
}

export async function postJSON(endpoint: string, body: any) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error((await res.json()).error || 'Erro na API')
  return res.json()
}

export async function putJSON(endpoint: string, body: any) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error((await res.json()).error || 'Erro na API')
  return res.json()
}

export async function deleteJSON(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`, { method: 'DELETE' })
  if (!res.ok) throw new Error((await res.json()).error || 'Erro na API')
  return res.json()
}
