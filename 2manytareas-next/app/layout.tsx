import './globals.css'


export const metadata = {
title: '2ManyTareas',
description: 'Agenda de tarefas simples em Next',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="pt-BR">
<body className="bg-slate-50 text-slate-800">{children}</body>
</html>
)
}