export type Task = {
  id: number
  titulo: string
  descricao?: string
  status: 'A fazer' | 'Em andamento' | 'Concluído' | 'Parada'
  usuario_id: number
  date: string
}

export type Usuario = {
  id: number
  nome: string
  email: string
}
