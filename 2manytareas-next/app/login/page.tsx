'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
    <main className="flex flex-col items-center justify-center min-h-screen bg-green-950 px-4">
      {/* Botão voltar */}
      <div className="self-start mb-6">
        <Link href="/" className="flex items-center text-green-100 hover:text-green-300">
          <ArrowLeft size={24} />
          <span className="ml-2">Voltar</span>
        </Link>
      </div>

      <form 
        onSubmit={handleLogin} 
        className="flex flex-col gap-4 p-8 bg-green-100 rounded-xl shadow-xl w-full max-w-sm"
      >
        <h1 className="text-3xl font-bold text-center text-green-950 mb-6">Entrar</h1>

        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className="border border-green-950 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-950 bg-green-300 text-green-950 placeholder-green-950 transition"
        />

        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
          className="border border-green-950 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-950 bg-green-300 text-green-950 placeholder-green-950 transition"
        />

        <button className="border border-green-950 bg-green-950 text-green-100 hover:text-green-950 py-2 rounded-lg hover:bg-green-300 transition font-medium">
          Entrar
        </button>

        <p className="text-sm text-center text-green-950 mt-2">
          Não tem conta? <a href="/cadastro" className="font-semibold hover:underline">Cadastre-se</a>
        </p>
      </form>
    </main>
  )
}
