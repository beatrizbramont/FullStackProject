'use client'
import React from 'react'
import { Task } from '../lib/types'

type TaskListProps = {
  tasks: Task[]
  onDelete: (id: number) => void
}

export default function TaskList({ tasks, onDelete }: TaskListProps) {
  if (!tasks || tasks.length === 0) return <p className="mt-4 text-slate-500">Nenhuma tarefa cadastrada.</p>

  return (
    <div className="mt-4 flex flex-col gap-3">
      {tasks.map(t => (
        <div key={t.id} className="p-3 border rounded flex items-center justify-between">
          <div>
            <div className="font-medium">{t.titulo}</div>
            <div className="text-sm text-slate-500">{t.status}</div>
          </div>
          <button onClick={() => onDelete(t.id)} className="px-3 py-1 rounded bg-red-600 text-white">Excluir</button>
        </div>
      ))}
    </div>
    
  )
}
