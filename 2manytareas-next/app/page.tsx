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
    { label: 'Em andamento', icon: <Clock className="w-6 h-6" />, color: 'bg-yellow-800 hover:bg-yellow-400 text-gray-900' },
    { label: 'Concluída', icon: <CheckCircle2 className="w-6 h-6" />, color: 'bg-green-800 hover:bg-green-500 text-white' },
    { label: 'A fazer', icon: <ClipboardList className="w-6 h-6" />, color: 'bg-blue-800 hover:bg-blue-500 text-white' },
    { label: 'Aguardando', icon: <Hourglass className="w-6 h-6" />, color: 'bg-purple-800 hover:bg-purple-500 text-white' },
    { label: 'Criar tarefa', icon: <PlusCircle className="w-6 h-6" />, color: 'bg-emerald-800 hover:bg-emerald-400 text-white' },
  ]

  return (
    <div className="min-h-screen bg-green-100 text-green-100 flex flex-col">
      <HeaderPublic />

      <main className="flex flex-col items-center justify-center flex-1 py-24 px-4">
        <p className="text-green-950 text-center max-w-lg mb-12">
          Seja Bem-Vindo ao 2ManyTareas, o site que irá te ajudar a organizar suas tarefas de forma prática e eficiente. Faça login ou cadastre-se para começar!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-lg">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleRedirect('/tarefas')}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl ${btn.color} transition transform hover:scale-105`}
            >
              {btn.icon}
              <span className="text-sm mt-2">{btn.label}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
