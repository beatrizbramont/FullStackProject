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
    'A fazer': 'bg-blue-100 border-blue-400',
    'Em andamento': 'bg-yellow-100 border-yellow-400',
    'Concluído': 'bg-green-100 border-green-400',
    'Aguardando': 'bg-purple-100 border-purple-400',
  }

  function getStatusIcon(status: Task['status']) {
    switch (status) {
      case 'A fazer': return <ClipboardList size={20} />
      case 'Em andamento': return <Clock size={20} />
      case 'Concluído': return <CheckCircle size={20} />
      case 'Aguardando': return <Hourglass size={20} />
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
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              {getStatusIcon(status)} {status}
            </h3>
            <div className="flex flex-col gap-2">
              {tasksDoStatus.map(task => (
                <div
                  key={task.id}
                  className={`p-3 border rounded flex items-center justify-between cursor-pointer ${statusColors[status]}`}
                  onClick={() => onUpdateStatus(task)}
                >
                  <div>
                    <div className="font-medium">{task.titulo}</div>
                    <div className="text-sm text-slate-600">{task.descricao}</div>
                  </div>
                  <div className="flex gap-2">
                    <Edit2
                      size={20}
                      className="text-blue-600 cursor-pointer"
                      onClick={e => { e.stopPropagation(); onEdit(task) }}
                    />
                    <Trash2
                      size={20}
                      className="text-red-600 cursor-pointer"
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
