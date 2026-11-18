// Datas no formato "AAAA-MM-DD" sempre no fuso do aparelho

export const toDateInput = (date = new Date()) => date.toLocaleDateString('en-CA')

export const todayInput = () => toDateInput(new Date())

// "AAAA-MM-DD" -> Date ao meio-dia local (evita pular de dia com horário de verão)
const parse = (value) => {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day, 12)
}

export const addDays = (value, days) => {
    const date = parse(value)
    date.setDate(date.getDate() + days)
    return toDateInput(date)
}

// Dia da tarefa. Tarefas muito antigas, de antes da coluna "date", usam o createdAt
export const taskDate = (task) => {
    if (task?.date) return task.date
    if (task?.createdAt) return toDateInput(new Date(task.createdAt))
    return null
}

// "Hoje", "Ontem" ou "seg., 10/11"
export const formatDayLabel = (value) => {
    const today = todayInput()
    if (value === today) return 'Hoje'
    if (value === addDays(today, -1)) return 'Ontem'
    return parse(value).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })
}

export const isValidDateInput = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value ?? '')
