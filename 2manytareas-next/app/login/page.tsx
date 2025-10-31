'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, LogIn } from 'lucide-react'
import { postJSON } from '../../lib/api'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    try {
      const data = await postJSON('/login', { email, senha })
      localStorage.setItem('usuario_id', data.usuario.id)
      localStorage.setItem('usuario_nome', data.usuario.nome)
      router.push('/home')
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-100 px-4">
      {/* Botão voltar */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </Link>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-5 p-8 bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm border border-slate-700"
      >
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-emerald-400 mb-1">Login</h1>
          <p className="text-sm text-slate-400">Acesse sua conta para continuar</p>
        </div>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          required
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-md transition"
        >
          <LogIn size={18} />
          Entrar
        </button>

        <p className="text-sm text-center text-slate-400 mt-2">
          Não tem conta?{' '}
          <Link href="/cadastro" className="text-emerald-400 hover:underline font-medium">
            Cadastre-se
          </Link>
        </p>
      </form>
    </main>
  )
}
