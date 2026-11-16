//css
import styles from './Logs.module.css'

//hooks
import { useEffect, useState } from 'react'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { getTasks } from '../../slices/taskSlice'

//components
import Navbar from '../../components/Navbar'
import TaskCard from '../../components/TaskCard'

const Logs = () => {
    const dispatch = useDispatch()
    const { tasks } = useSelector((state) => state.task)

    const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'))

    const sortedTasks = tasks.filter((task) => {
        return task.createdAt?.startsWith(date)
    })

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <p>Registros</p>
                <input
                    type="date"
                    className={styles.date_input}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </header>

            <div className={styles.card_list}>
                {Array.isArray(sortedTasks) && sortedTasks.length > 0 ? (
                    sortedTasks.map((task) => (
                        <TaskCard task={task} key={task.id} />
                    ))
                ) : (
                    <p className={styles.empty_message}>
                        Nenhuma tarefa registrada nesta data.
                    </p>
                )}
            </div>

            <Navbar />
        </div>
    )
}

export default Logs