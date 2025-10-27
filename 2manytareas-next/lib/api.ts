// lib/api.ts

const API_URL = 'http://127.0.0.1:8001'

// Função genérica para GET
export async function getJSON(path: string) {
  const res = await fetch(`${API_URL}${path}`)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Erro na requisição GET')
  }
  return res.json()
}

// Função genérica para POST
export async function postJSON(path: string, data: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Erro na requisição POST')
  }
  return res.json()
}

// Função genérica para PUT
export async function putJSON(path: string, data: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Erro na requisição PUT')
  }
  return res.json()
}

// Função genérica para DELETE
export async function deleteJSON(path: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Erro na requisição DELETE')
  }
  return res.json()
}
