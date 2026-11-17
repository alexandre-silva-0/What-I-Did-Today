import styles from './TaskCard.module.css'

import { Link } from 'react-router-dom'
import { formatTime, getDuration } from '../utils/time'

const TaskCard = ({ task }) => {
    const start = formatTime(task.startedAt)
    const end = formatTime(task.finishedAt)
    const duration = getDuration(task.startedAt, task.finishedAt)

    return (
        <Link to={`/task/${task.id}`} className={styles.card}>
            <p className={styles.content}>{task.content}</p>

            <div className={styles.footer}>
                <span className={styles.time}>
                    <i className="bi bi-clock" aria-hidden="true"></i>
                    {end ? `${start} – ${end}` : start}
                </span>

                {duration && <span className={styles.duration}>{duration}</span>}

                <i className={`bi bi-chevron-right ${styles.chevron}`} aria-hidden="true"></i>
            </div>
        </Link>
    )
}
export default TaskCard
