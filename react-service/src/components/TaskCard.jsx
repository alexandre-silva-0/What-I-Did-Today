import styles from './TaskCard.module.css'

import { useNavigate } from 'react-router-dom'

const TaskCard = ({ task }) => {

    const navigate = useNavigate()

    return (
        <div className={styles.card} onClick={() => { navigate(`/task/${task.id}`) }}>
            <p>{task.content}</p>
            <hr />
            <div className={styles.time_div} >
                <i class="bi bi-clock"></i>
                <p>{task.startedAt} - {task.finishedAt}</p>
            </div>
        </div>
    )
}
export default TaskCard