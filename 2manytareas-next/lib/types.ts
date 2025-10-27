export type Task = {
  id: number
  titulo: string
  descricao?: string
  status: 'A fazer' | 'Em andamento' | 'Concluído' | 'Aguardando'
  usuario_id: number
  startDate?: string   
  endDate?: string     
}

export type TaskCreateData = {
  titulo: string
  descricao?: string
  status: Task['status']
  startDate?: string
  endDate?: string
  usuario_id: number
}

export type Usuario = {
  id: number
  nome: string
  email: string
}
