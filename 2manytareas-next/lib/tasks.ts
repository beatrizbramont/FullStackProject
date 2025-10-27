// lib/tasks.ts
import { Task } from './types'

const API_URL = 'http://127.0.0.1:8001'

// 🔹 Buscar tarefas de um usuário
export async function getTasks(usuario_id: number): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tarefas/usuario/${usuario_id}`)
  if (!res.ok) throw new Error('Erro ao buscar tarefas')
  return res.json()
}

// 🔹 Criar nova tarefa
export type TaskCreateData = {
  titulo: string
  descricao?: string
  status: Task['status']
  usuario_id: number
  startDate?: string
  endDate?: string
}

export async function createTask(data: TaskCreateData): Promise<Task> {
  const res = await fetch(`${API_URL}/tarefas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Erro ao criar tarefa')
  }
  const json = await res.json()
  return {
    id: json.tarefa.id,
    titulo: json.tarefa.titulo,
    descricao: json.tarefa.descricao,
    status: json.tarefa.status,
    usuario_id: json.tarefa.usuario_id,
    startDate: json.tarefa.startDate,
    endDate: json.tarefa.endDate,
  }
}

// 🔹 Atualizar tarefa (parcial)
export async function updateTask(id: number, data: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_URL}/tarefas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Erro ao atualizar tarefa')
  }
  const json = await res.json()
  return {
    id: json.tarefa.id,
    titulo: json.tarefa.titulo,
    descricao: json.tarefa.descricao,
    status: json.tarefa.status,
    usuario_id: json.tarefa.usuario_id,
    startDate: json.tarefa.startDate,
    endDate: json.tarefa.endDate,
  }
}

// 🔹 Deletar tarefa
export async function deleteTaskAPI(id: number): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/tarefas/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Erro ao deletar tarefa')
  }
  return res.json()
}
