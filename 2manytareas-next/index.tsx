'use client'

import Link from 'next/link'

export default function IndexPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-green-950 text-white">
      <h1 className="text-5xl font-bold mb-8">Bem-vindo ao 2ManyTareas</h1>
      <div className="flex gap-6">
        <Link
          href="/login"
          className="bg-green-900 px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          Login
        </Link>
        <Link
          href="/cadastro"
          className="bg-green-400 px-6 py-3 rounded-lg hover:bg-green-500 transition font-semibold text-black"
        >
          Cadastro
        </Link>
      </div>
    </main>
  )
}
