'use client'

import React, { useState, useEffect } from 'react'
import { LogOut, Calendar as CalendarIcon } from 'lucide-react'
import Calendar from './Calendar'
import { Task } from '../lib/types'

type HeaderProps = {
  tasks: Task[]
}

export default function Header({ tasks }: HeaderProps) {
  const [nome, setNome] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const nomeUsuario = localStorage.getItem('usuario_nome')
    if (nomeUsuario) setNome(nomeUsuario)
  }, [])

  const handleLogout = () => {
    if (!isClient) return
    localStorage.removeItem('usuario_id')
    localStorage.removeItem('usuario_nome')
    location.href = '/' // redireciona para a página inicial
  }

  if (!isClient) return null // não renderiza nada no SSR

  return (
    <header className="flex justify-between items-center p-4 bg-slate-900 text-slate-100 shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-4 relative">
        <span className="font-medium">{nome ? `Olá, ${nome}` : 'Bem-vindo'}</span>

        <button
          onClick={() => setShowCalendar(prev => !prev)}
          className="p-2 rounded hover:bg-slate-800 hover:text-emerald-400 transition flex items-center justify-center"
        >
          <CalendarIcon className="w-5 h-5" />
        </button>

        {showCalendar && (
          <div className="absolute top-full left-0 mt-2 z-50">
            <Calendar tasks={tasks} />
          </div>
        )}
      </div>

      {nome && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-800 hover:text-emerald-400 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      )}
    </header>
  )
}
