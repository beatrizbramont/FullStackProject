'use client'

import React, { useEffect, useState } from 'react'
import { Task } from '../lib/types'
import { createTask, updateTask } from '../lib/tasks'
import { X } from 'lucide-react'

type ModalTarefaProps = {
  isOpen: boolean
  onClose: () => void
  usuarioId: number
  taskToEdit?: Task
  onSaved: (task: Task) => void
}

export default function ModalTarefa({ isOpen, onClose, usuarioId, taskToEdit, onSaved }: ModalTarefaProps) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState<'A fazer' | 'Em andamento' | 'Concluído' | 'Aguardando'>('A fazer')
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10))
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))

  // Atualiza campos quando taskToEdit muda
  useEffect(() => {
    if (taskToEdit) {
      setTitulo(taskToEdit.titulo || '')
      setDescricao(taskToEdit.descricao || '')
      setStatus(taskToEdit.status || 'A fazer')
      setStartDate(taskToEdit.startDate || new Date().toISOString().slice(0, 10))
      setEndDate(taskToEdit.endDate || new Date().toISOString().slice(0, 10))
    } else {
      setTitulo('')
      setDescricao('')
      setStatus('A fazer')
      setStartDate(new Date().toISOString().slice(0, 10))
      setEndDate(new Date().toISOString().slice(0, 10))
    }
  }, [taskToEdit])

  const handleSave = async () => {
    const taskData = { titulo, descricao, status, startDate, endDate, usuario_id: usuarioId }
    try {
      let savedTask: Task
      if (taskToEdit) {
        savedTask = await updateTask(taskToEdit.id, taskData)
      } else {
        savedTask = await createTask(taskData)
      }
      onSaved(savedTask)
      onClose()
    } catch (err) {
      console.error(err)
      alert('Erro ao salvar tarefa')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 w-full max-w-md relative shadow-lg shadow-emerald-950/30">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-emerald-900/40 transition"
        >
          <X />
        </button>
        <h2 className="text-lg font-semibold mb-4 text-emerald-400">
          {taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            className="border border-emerald-800 rounded p-2 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            className="border border-emerald-800 rounded p-2 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
          <select
            value={status}
            onChange={e => setStatus(e.target.value as Task['status'])}
            className="border border-emerald-800 rounded p-2 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            <option>A fazer</option>
            <option>Em andamento</option>
            <option>Concluído</option>
            <option>Aguardando</option>
          </select>

          <div className="flex gap-2">
            <label className="flex flex-col text-sm w-1/2">
              Início:
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="border border-emerald-800 rounded p-2 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </label>
            <label className="flex flex-col text-sm w-1/2">
              Término:
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="border border-emerald-800 rounded p-2 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </label>
          </div>

          <button
            onClick={handleSave}
            className="mt-3 w-full bg-emerald-900 hover:bg-emerald-800 text-white rounded p-2 transition duration-200 shadow-md shadow-emerald-950/50"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
