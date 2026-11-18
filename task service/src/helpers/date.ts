// Fuso usado para decidir "que dia é hoje" e o dia das tarefas antigas
export const APP_TIMEZONE = process.env.APP_TIMEZONE ?? 'America/Sao_Paulo'

const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: APP_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
})

// "AAAA-MM-DD" de um instante, no fuso do app
export const toLocalDate = (value: Date | string) => formatter.format(new Date(value))

export const todayLocal = () => toLocalDate(new Date())
