'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Index() {
  const [showSobreNos, setShowSobreNos] = useState(false)

  return (
    <main className="min-h-screen bg-green-950 text-white flex flex-col items-center justify-center gap-6 px-4 relative">
      <h1 className="text-5xl font-extrabold text-green-400 mb-4">2ManyTareas</h1>
      <p className="text-lg text-white/80 text-center max-w-lg">
        Gerencie suas tarefas de forma prática. Organize o que está em andamento, concluído ou pausado.
      </p>

      <div className="flex gap-4 items-start relative">
        <Link
          href="/login"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition"
        >
          Entrar
        </Link>

        <Link
          href="/cadastro"
          className="bg-white text-green-950 hover:bg-white/90 px-6 py-3 rounded-lg font-semibold transition"
        >
          Cadastre-se
        </Link>

        {/* Componente Sobre Nós */}
        <div
          className="px-6 py-3 rounded-lg bg-green-800 hover:bg-green-700 cursor-pointer transition relative"
          onMouseEnter={() => setShowSobreNos(true)}
          onMouseLeave={() => setShowSobreNos(false)}
        >
          <p className="font-semibold text-center">Sobre nós</p>

          {/* Tooltip */}
          {showSobreNos && (
            <div className="absolute z-10 top-[110%] left-1/2 transform -translate-x-1/2 w-64 p-4 bg-green-900 text-white rounded shadow-lg text-sm text-center">
              Somos a 2ManyTareas, uma plataforma que ajuda você a gerenciar suas tarefas
              e otimizar seu tempo de forma prática e intuitiva.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
