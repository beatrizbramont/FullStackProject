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
      ? 'relative before:absolute before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-green-300 text-white'
      : 'text-green-100'
  }

  return (
    <div className="absolute z-50 mt-2 bg-green-950 p-4 rounded-lg shadow-lg w-64">
      <DatePicker
        selected={date}
        onChange={d => d && setDate(d)}
        inline
        calendarClassName="bg-green-950 text-white border-none rounded-lg p-2"
        dayClassName={dayClassName}
      />

      {/* Lista de tarefas do dia */}
      <div className="mt-3 max-h-40 overflow-auto">
        {getTasksForDate(date).length === 0 ? (
          <p className="text-green-100 text-sm px-2">Nenhuma tarefa neste dia</p>
        ) : (
          getTasksForDate(date).map(task => (
            <div
              key={task.id}
              className="bg-green-300 text-green-950 rounded px-2 py-1 text-sm mb-1"
            >
              {task.titulo}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
