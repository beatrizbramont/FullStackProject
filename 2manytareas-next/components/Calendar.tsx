'use client'

import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Task } from '../lib/types'

type CalendarProps = {
  tasks: Task[]
}

export default function Calendar({ tasks }: CalendarProps) {
  const [date, setDate] = useState(new Date())

  const getTasksForDate = (d: Date) => {
    const dateStr = d.toISOString().slice(0, 10)
    return tasks.filter(t => t.startDate === dateStr || t.endDate === dateStr)
  }

  const dayClassName = (d: Date) => {
    const hasTask = getTasksForDate(d).length > 0
    return hasTask
      ? 'relative before:absolute before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-emerald-500 text-white'
      : 'text-emerald-100'
  }

  return (
    <div className="absolute z-50 mt-2 bg-slate-900 p-5 rounded-2xl shadow-lg shadow-emerald-950/40 w-80 border border-emerald-800">
      <DatePicker
        selected={date}
        onChange={d => d && setDate(d)}
        inline
        calendarClassName="dark-calendar"
        dayClassName={dayClassName}
      />

      {/* Lista de tarefas do dia */}
      <div className="mt-4 max-h-48 overflow-auto border-t border-emerald-800 pt-3">
        {getTasksForDate(date).length === 0 ? (
          <p className="text-emerald-200 text-sm px-2">Nenhuma tarefa neste dia</p>
        ) : (
          getTasksForDate(date).map(task => (
            <div
              key={task.id}
              className="bg-emerald-800 text-white rounded px-3 py-2 text-sm mb-2 shadow-sm shadow-emerald-950/30"
            >
              {task.titulo}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
