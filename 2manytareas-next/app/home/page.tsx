'use client'

import React, { useEffect, useState } from 'react'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import Header from '../../components/Header'
import ModalTarefa from '../../components/ModalTarefa'
import { useAuth } from '../../lib/useauth'
import { getTasks, deleteTaskAPI } from '../../lib/tasks'
import { Task } from '../../lib/types'

export default function HomePage() {
  useAuth()

  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [usuarioId, setUsuarioId] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const id = localStorage.getItem('usuario_id')
    if (id) setUsuarioId(Number(id))
  }, [])

  useEffect(() => {
    if (!usuarioId) return
    fetchTasks()
  }, [usuarioId])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      if (usuarioId) {
        const data = await getTasks(usuarioId)
        setTasks(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTaskAPI(id)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error(err)
      alert('Erro ao deletar tarefa')
    }
  }

  if (!isClient) return null // não renderiza nada no SSR
  if (usuarioId === null) return <p className="text-center mt-20">Carregando...</p>
  if (loading) return <p className="text-center mt-20">Carregando tarefas...</p>

  const statusColors: Record<Task['status'], string> = {
    'A fazer': 'bg-blue-800 border-blue-600',
    'Em andamento': 'bg-yellow-800 border-yellow-600',
    'Concluído': 'bg-green-800 border-green-600',
    'Aguardando': 'bg-purple-800 border-purple-600',
  }

  const groupedTasks: Record<Task['status'], Task[]> = {
    'A fazer': [],
    'Em andamento': [],
    'Concluído': [],
    'Aguardando': [],
  }
  tasks.forEach(t => groupedTasks[t.status].push(t))

  return (
    <>
      <Header tasks={tasks} />
      <main className="min-h-screen flex flex-col items-center py-8 px-4 bg-slate-900 text-slate-100">
        <section className="max-w-4xl w-full">
          <h1 className="text-3xl text-emerald-400 font-bold mb-2">Minhas Tarefas</h1>
          <p className="text-slate-400 mb-6">Gerencie suas atividades por status.</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {(['A fazer', 'Em andamento', 'Concluído', 'Aguardando'] as Task['status'][]).map(status => (
              <div
                key={status}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${statusColors[status]}`}
              >
                <span className="font-medium">{status}</span>
                <span className="text-sm">{groupedTasks[status].length} tarefas</span>
              </div>
            ))}

            <button
              onClick={() => { setTaskToEdit(undefined); setModalOpen(true) }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-500 transition"
            >
              <PlusCircle size={28} />
              <span className="text-sm mt-2">Criar tarefa</span>
            </button>
          </div>

          <div className="flex flex-col gap-6 text-slate-100">
            {(['A fazer', 'Em andamento', 'Concluído', 'Aguardando'] as Task['status'][]).map(status => {
              const tasksDoStatus = groupedTasks[status]
              if (!tasksDoStatus.length) return null
              return (
                <div key={status}>
                  <h3 className="font-semibold text-lg mb-2">{status}</h3>
                  <div className="flex flex-col gap-2">
                    {tasksDoStatus.map(task => (
                      <div
                        key={task.id}
                        className={`p-3 border rounded flex items-center justify-between cursor-pointer ${statusColors[status]}`}
                      >
                        <div>
                          <div className="font-medium">{task.titulo}</div>
                          <div className="text-sm text-slate-300">{task.descricao}</div>
                        </div>
                        <div className="flex gap-2">
                          <Edit
                            size={18}
                            className="cursor-pointer hover:text-emerald-400"
                            onClick={() => { setTaskToEdit(task); setModalOpen(true) }}
                          />
                          <Trash2
                            size={18}
                            className="cursor-pointer hover:text-red-400"
                            onClick={() => handleDelete(task.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <ModalTarefa
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        usuarioId={usuarioId!}
        taskToEdit={taskToEdit}
        onSaved={(task) => {
          setTasks(prev => {
            const exists = prev.find(t => t.id === task.id)
            if (exists) return prev.map(t => (t.id === task.id ? task : t))
            return [...prev, task]
          })
        }}
      />
    </>
  )
}
