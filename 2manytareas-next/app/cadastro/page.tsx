'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { postJSON } from '../../lib/api'

export default function Cadastro() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault()
    try {
      setIsLoading(true)
      await postJSON('/cadastro', { nome, email, senha })
      alert('Cadastro realizado com sucesso!')
      router.push('/login')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsLoading(false)
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
        onSubmit={handleCadastro}
        className="flex flex-col gap-5 p-8 bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm border border-slate-700 transition-transform duration-300 hover:scale-[1.02]"
      >
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-emerald-400 mb-1">Criar conta</h1>
          <p className="text-sm text-slate-400">Preencha os campos abaixo para começar</p>
        </div>

        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          required
        />

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
          disabled={isLoading}
          className={`flex items-center justify-center gap-2 py-2 rounded-lg font-medium shadow-md transition
            ${isLoading
              ? 'bg-emerald-700 cursor-not-allowed opacity-70'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
        >
          {isLoading ? (
            <span className="animate-pulse">Cadastrando...</span>
          ) : (
            <>
              <UserPlus size={18} />
              Cadastrar
            </>
          )}
        </button>

        <p className="text-sm text-center text-slate-400 mt-2">
          Já tem conta?{' '}
          <Link href="/login" className="text-emerald-400 hover:underline font-medium">
            Entrar
          </Link>
        </p>
      </form>
    </main>
  )
}
