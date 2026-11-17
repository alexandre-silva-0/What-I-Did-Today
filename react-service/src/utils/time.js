// O back devolve TIME como "HH:MM:SS"; na tela usamos só "HH:MM"
export const formatTime = (time) => (time ? time.slice(0, 5) : '')

const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
}

// Duração entre início e fim (ex.: "1h 30min"); considera virada de meia-noite
export const getDuration = (startedAt, finishedAt) => {
    if (!startedAt || !finishedAt) return null

    let diff = toMinutes(finishedAt) - toMinutes(startedAt)
    if (diff < 0) diff += 24 * 60
    if (diff === 0) return null

    const hours = Math.floor(diff / 60)
    const minutes = diff % 60

    if (hours === 0) return `${minutes}min`
    if (minutes === 0) return `${hours}h`
    return `${hours}h ${minutes}min`
}
