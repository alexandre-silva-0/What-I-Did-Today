import styles from './TaskCard.module.css'

const TaskCard = () => {

    const content = "É aqui que a task vai ficar e tals"
    const startedAt = "09:00:00 AM"
    const finishedAt = "10:00:00 AM"

    return (
        <div className={styles.card}>
            <p>{content}</p>
            <hr />
            <div className={styles.time_div} >
                <p>{startedAt}</p>
                <p>{finishedAt}</p>
            </div>
        </div>
    )
}
export default TaskCard