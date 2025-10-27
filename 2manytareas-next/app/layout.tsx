import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: '2ManyTareas',
  description: 'Gerencie suas tarefas',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-900 text-gray-100">{children}</body>
    </html>
  )
}
