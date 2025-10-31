'use client'
import React from 'react'
import { Trash2, Edit2, ClipboardList, Clock, CheckCircle, Hourglass } from 'lucide-react'
import { Task } from '../lib/types'

type TaskListProps = {
  tasks: Task[]
  onDelete: (id: number) => void
  onEdit: (task: Task) => void
  onUpdateStatus: (task: Task) => void
}

export default function TaskList({ tasks, onDelete, onEdit, onUpdateStatus }: TaskListProps) {
  const statusColors: Record<Task['status'], string> = {
    'A fazer': 'bg-blue-800 border-blue-600 text-white',
    'Em andamento': 'bg-yellow-800 border-yellow-600 text-white',
    'Concluído': 'bg-green-800 border-green-600 text-white',
    'Aguardando': 'bg-purple-800 border-purple-600 text-white',
  }

  function getStatusIcon(status: Task['status']) {
    switch (status) {
      case 'A fazer': return <ClipboardList size={20} className="text-white" />
      case 'Em andamento': return <Clock size={20} className="text-white" />
      case 'Concluído': return <CheckCircle size={20} className="text-white" />
      case 'Aguardando': return <Hourglass size={20} className="text-white" />
    }
  }

  const groupedTasks: Record<Task['status'], Task[]> = {
    'A fazer': [],
    'Em andamento': [],
    'Concluído': [],
    'Aguardando': [],
  }
  tasks.forEach(t => groupedTasks[t.status].push(t))

  return (
    <div className="flex flex-col gap-6">
      {(['A fazer', 'Em andamento', 'Concluído', 'Aguardando'] as Task['status'][]).map(status => {
        const tasksDoStatus = groupedTasks[status]
        if (!tasksDoStatus.length) return null
        return (
          <div key={status}>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-emerald-400">
              {getStatusIcon(status)} {status}
            </h3>
            <div className="flex flex-col gap-2">
              {tasksDoStatus.map(task => (
                <div
                  key={task.id}
                  className={`p-3 border rounded flex items-center justify-between cursor-pointer ${statusColors[status]} transition hover:bg-slate-700`}
                  onClick={() => onUpdateStatus(task)}
                >
                  <div>
                    <div className="font-medium">{task.titulo}</div>
                    <div className="text-sm text-slate-300">{task.descricao}</div>
                  </div>
                  <div className="flex gap-2">
                    <Edit2
                      size={20}
                      className="cursor-pointer text-emerald-400 hover:text-emerald-300 transition"
                      onClick={e => { e.stopPropagation(); onEdit(task) }}
                    />
                    <Trash2
                      size={20}
                      className="cursor-pointer text-red-500 hover:text-red-400 transition"
                      onClick={e => { e.stopPropagation(); onDelete(task.id) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
