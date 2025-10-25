import { Task } from './types'
import { getJSON, postJSON, putJSON, deleteJSON } from './api'

export async function getTasks(usuario_id: number): Promise<Task[]> {
  return getJSON(`/tarefas/usuario/${usuario_id}`)
}

export async function createTask(tarefa: Omit<Task,'id'>) {
  return postJSON('/tarefas', tarefa)
}

export async function updateTask(id: number, tarefa: Partial<Task>) {
  return putJSON(`/tarefas/${id}`, tarefa)
}

export async function deleteTaskAPI(id: number) {
  return deleteJSON(`/tarefas/${id}`)
}
