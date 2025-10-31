'use client'

import Link from 'next/link'

export default function IndexPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-100 px-4">
      <h1 className="text-5xl font-extrabold mb-8 text-emerald-400 text-center">
        Bem-vindo ao 2ManyTareas
      </h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          href="/login"
          className="bg-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-500 transition font-semibold text-white text-center"
        >
          Login
        </Link>
        <Link
          href="/cadastro"
          className="bg-slate-100 px-6 py-3 rounded-lg hover:bg-slate-200 transition font-semibold text-slate-900 text-center"
        >
          Cadastro
        </Link>
      </div>
    </main>
  )
}
