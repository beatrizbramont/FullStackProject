import Link from 'next/link'
import Header from '../components/Header'

export default function Index() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6">
      <Header />
      <section className="max-w-3xl w-full mt-8 bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold">2ManyTareas</h1>
        <p className="mt-2 text-slate-600">Uma agenda de tarefas simples com calendário integrado.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/login" className="px-4 py-2 rounded-md bg-slate-800 text-white">Login</Link>
          <Link href="/cadastro" className="px-4 py-2 rounded-md border border-slate-300">Criar Tarefa</Link>
          <Link href="/home" className="px-4 py-2 rounded-md bg-emerald-500 text-white">Ir para Home</Link>
        </div>
      </section>
    </main>
  )
}
