'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
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
    <>
      <main className="flex items-center justify-center min-h-screen bg-green-950">
        <form 
          onSubmit={handleLogin} 
          className="flex flex-col gap-4 p-8 bg-black rounded-xl shadow-xl w-full max-w-sm"
        >
          <h1 className="text-3xl font-bold text-center text-green-400 mb-6">Entrar</h1>

          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="border border-green-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-black text-green-200 placeholder-green-400 transition"
          />

          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={e => setSenha(e.target.value)} 
            className="border border-green-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-black text-green-200 placeholder-green-400 transition"
          />

          <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium">
            Entrar
          </button>

          <p className="text-sm text-center text-green-400 mt-2">
            Não tem conta? <a href="/cadastro" className="font-semibold hover:underline">Cadastre-se</a>
          </p>
        </form>
      </main>
    </>
  )
}
