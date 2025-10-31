'use client'
import Link from 'next/link'
import { LogIn, UserPlus } from 'lucide-react'

export default function HeaderPublic() {
  return (
    <header className="w-full bg-slate-900 text-slate-100 border-b border-slate-700 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo / Título */}
      <h1 className="text-2xl font-bold text-emerald-400 cursor-pointer hover:text-emerald-300 transition">
        2ManyTareas
      </h1>

      {/* Botões de Login e Cadastro */}
      <div className="flex gap-3">
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-emerald-400 border border-slate-700 rounded-lg transition shadow-sm"
        >
          <LogIn className="w-4 h-4" />
          <span className="text-sm font-medium">Login</span>
        </Link>

        <Link
          href="/cadastro"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition shadow-md shadow-emerald-800/30"
        >
          <UserPlus className="w-4 h-4" />
          <span className="text-sm font-medium">Cadastrar</span>
        </Link>
      </div>
    </header>
  )
}
