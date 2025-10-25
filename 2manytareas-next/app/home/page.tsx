'use client'
import React from 'react'
import { useAuth } from '../../lib/useauth'
import Header from '../../components/Header'
import Link from 'next/link'

export default function Home() {
  useAuth() // protege a rota

  return (
    <>
      <Header />
      <main className="min-h-screen bg-green-950 text-white flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-5xl font-extrabold text-green-400 mb-4">Bem-vindo(a)!</h1>
        <p className="text-lg text-white/80 text-center max-w-lg">
          Aqui você pode gerenciar suas tarefas, acompanhar o calendário e organizar seu dia.
        </p>
        <div className="flex gap-4 mt-6">
          <Link href="/tarefas" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition">
            Minhas Tarefas
          </Link>
          <Link href="/calendar" className="bg-white text-green-950 hover:bg-white/90 px-6 py-3 rounded-lg font-semibold transition">
            Calendário
          </Link>
        </div>
      </main>
    </>
  )
}
