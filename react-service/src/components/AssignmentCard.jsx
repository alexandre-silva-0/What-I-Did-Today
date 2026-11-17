import styles from './AssignmentCard.module.css'
import { Link } from 'react-router-dom'

// Mesmos valores do ENUM do model Assignment no back-end
const STATUS = {
    pending: { label: 'Pendente', className: styles.status_pending },
    in_progress: { label: 'Em andamento', className: styles.status_in_progress },
    done: { label: 'Concluído', className: styles.status_done },
}

const startOfDay = (date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
}

// Devolve o texto do prazo e se ele está atrasado/para hoje
const getDeadlineInfo = (deadline, status) => {
    if (!deadline) return null

    const date = new Date(deadline)
    const diffDays = Math.round((startOfDay(date) - startOfDay(new Date())) / 86400000)
    const sameYear = date.getFullYear() === new Date().getFullYear()

    const label = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        ...(sameYear ? {} : { year: 'numeric' }),
    })

    if (status === 'done') return { label, tone: '' }
    if (diffDays < 0) return { label: `${label} · atrasada`, tone: styles.deadline_late }
    if (diffDays === 0) return { label: 'Hoje', tone: styles.deadline_today }
    return { label, tone: '' }
}

const AssignmentCard = ({ assignment }) => {
    const status = STATUS[assignment.status] ?? STATUS.pending
    const deadline = getDeadlineInfo(assignment.deadline, assignment.status)
    const isDone = assignment.status === 'done'

    return (
        <Link
            to={`/assignment/${assignment.id}`}
            className={`${styles.card} ${isDone ? styles.card_done : ''}`}
        >
            <p className={styles.content}>{assignment.content}</p>
            <hr />
            <div className={styles.footer}>
                <span className={`${styles.status} ${status.className}`}>
                    <span className={styles.status_dot} aria-hidden="true"></span>
                    {status.label}
                </span>

                {deadline && (
                    <span className={`${styles.deadline} ${deadline.tone}`}>
                        <i className="bi bi-calendar-event" aria-hidden="true"></i>
                        {deadline.label}
                    </span>
                )}
            </div>
        </Link>
    )
}

export default AssignmentCard
