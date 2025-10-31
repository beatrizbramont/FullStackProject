'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ClipboardList, CheckCircle2, Clock, Hourglass, PlusCircle } from 'lucide-react'
import HeaderPublic from '../components/HeaderPublic'

export default function HomePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('usuario_nome')
    setIsAuthenticated(!!user)
  }, [])

  const handleRedirect = (path: string) => {
    if (isAuthenticated) {
      router.push(path)
    } else {
      router.push('/login')
    }
  }

  const buttons = [
    { label: 'Em andamento', icon: <Clock className="w-6 h-6" />, color: 'bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-300' },
    { label: 'Concluída', icon: <CheckCircle2 className="w-6 h-6" />, color: 'bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300' },
    { label: 'A fazer', icon: <ClipboardList className="w-6 h-6" />, color: 'bg-blue-500/20 hover:bg-blue-500/40 text-blue-300' },
    { label: 'Aguardando', icon: <Hourglass className="w-6 h-6" />, color: 'bg-purple-500/20 hover:bg-purple-500/40 text-purple-300' },
    { label: 'Criar tarefa', icon: <PlusCircle className="w-6 h-6" />, color: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/40' },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <HeaderPublic />

      <main className="flex flex-col items-center justify-center flex-1 py-24 px-4">
        <div className="bg-slate-800/60 rounded-2xl p-8 shadow-lg max-w-2xl text-center border border-slate-700">
          <h1 className="text-2xl font-bold mb-4 text-emerald-400">Bem-vindo ao 2ManyTareas</h1>
          <p className="text-slate-300 mb-10">
            Organize suas tarefas de forma prática e eficiente. Faça login ou cadastre-se para começar!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-lg mx-auto">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                onClick={() => handleRedirect('/tarefas')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 transform hover:scale-105 ${btn.color}`}
              >
                {btn.icon}
                <span className="text-sm mt-2 font-medium">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
