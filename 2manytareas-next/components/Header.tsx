'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [usuarioNome, setUsuarioNome] = useState<string | null>(null)

  useEffect(() => {
    const nome = localStorage.getItem('usuario_nome')
    setUsuarioNome(nome)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('usuario_id')
    localStorage.removeItem('usuario_nome')
    window.location.href = '/login'
  }

  return (
    <header className="w-full bg-green-900 text-white flex justify-between items-center p-4 shadow-md">
      <h1 className="text-2xl font-bold">2ManyTareas</h1>
      <nav>
        {usuarioNome ? (
          <div className="flex items-center gap-4">
            <span>Olá, {usuarioNome}</span>
            <button onClick={handleLogout} className="bg-green-700 px-3 py-1 rounded hover:bg-green-800 transition">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/cadastro" className="hover:underline">Cadastro</Link>
          </div>
        )}
      </nav>
    </header>
  )
}
