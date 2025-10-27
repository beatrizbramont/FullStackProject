'use client'
import Link from 'next/link'

export default function HeaderPublic() {
  return (
    <header className="w-full bg-green-950 text-green-100 shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-red200">2ManyTareas</h1>
      <div className="flex gap-3">
        <Link
          href="/login"
          className="bg-green-100 hover:bg-green-800 text-green-950 hover:text-green-100 px-4 py-2 rounded-md transition"
        >
          Login
        </Link>
        <Link
          href="/cadastro"
          className="bg-green-100 hover:bg-green-800 text-green-950 hover:text-green-100 px-4 py-2 rounded-md transition"
        >
          Cadastro
        </Link>
      </div>
    </header>
  )
}
