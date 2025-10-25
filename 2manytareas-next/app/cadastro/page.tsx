'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { postJSON } from '../../lib/api'

export default function Cadastro() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault()
    try {
      await postJSON('/cadastro', { nome, email, senha })
      alert('Cadastro realizado com sucesso!')
      router.push('/login')
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <>
      <main className="flex items-center justify-center min-h-screen bg-green-950">
        <form 
          onSubmit={handleCadastro} 
          className="flex flex-col gap-4 p-8 bg-black rounded-xl shadow-xl w-full max-w-sm"
        >
          <h1 className="text-3xl font-bold text-center text-green-400 mb-6">Cadastro</h1>

          <input 
            type="text" 
            placeholder="Nome" 
            value={nome} 
            onChange={e => setNome(e.target.value)} 
            className="border border-green-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-black text-green-200 placeholder-green-400 transition"
          />

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
            Cadastrar
          </button>

          <p className="text-sm text-center text-green-400 mt-2">
            Já tem conta? <a href="/login" className="font-semibold hover:underline">Entrar</a>
          </p>
        </form>
      </main>
    </>
  )
}
