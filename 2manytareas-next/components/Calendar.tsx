'use client'
import React, { useMemo } from 'react'
import { Task } from '../lib/types'

type CalendarProps = { tasks: Task[] }

export default function Calendar({ tasks }: CalendarProps) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const days = useMemo(() => {
    const first = new Date(year, month, 1)
    const startDay = first.getDay()
    const totalDays = new Date(year, month + 1, 0).getDate()
    const cells: (Date | null)[] = []

    for (let i = 0; i < startDay; i++) cells.push(null)
    for (let d = 1; d <= totalDays; d++) cells.push(new Date(year, month, d))

    return cells
  }, [year, month])

  function tasksFor(date: Date | null) {
    if (!date) return []
    const key = date.toISOString().slice(0, 10)
    return tasks.filter(t => t.date === key)
  }

  return (
    <div className="grid grid-cols-7 gap-1 mt-2">
      {days.map((day,i) => (
        <div key={i} className="border rounded-lg p-1 h-24 flex flex-col bg-green-50">
          {day && <>
            <div className="font-medium text-center text-green-700">{day.getDate()}</div>
            <div className="flex flex-col gap-1 mt-1 overflow-auto">
              {tasksFor(day).map(t => (
                <div key={t.id} className={`px-1 rounded text-[10px] truncate
                  ${t.status === 'Concluído' ? 'bg-green-600 text-white' : 
                    t.status === 'Em andamento' ? 'bg-green-400 text-white' : 'bg-green-200 text-green-800'}`}>
                  {t.titulo}
                </div>
              ))}
            </div>
          </>}
        </div>
      ))}
    </div>
  )
}
