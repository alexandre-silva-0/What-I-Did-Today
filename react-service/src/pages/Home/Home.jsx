import { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import TaskCard from '../../components/TaskCard'
import styles from './Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks } from '../../slices/taskSlice'

const Home = () => {
    const dispatch = useDispatch()
    const { tasks } = useSelector((state) => state.task)
    const today = new Date()
    const todayString = today.toLocaleDateString('en-CA')

    const sortedTasks = Array.isArray(tasks)
        ? tasks.filter((task) => {
              if (!task?.createdAt) return false
              return new Date(task.createdAt).toLocaleDateString('en-CA') === todayString
          })
        : []

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <p>Hoje</p>
                <h1>{today.toLocaleDateString('pt-BR')}</h1>
            </header>

            <div className={styles.card_list}>
                {sortedTasks.map((task) => (
                    <TaskCard task={task} key={task.id} />
                ))}
                {sortedTasks.length === 0 && (
                    <div className={styles.no_tasks}>
                        <h3>Nenhuma tarefa registrada hoje.</h3>
                        <p>Comece agora ;)</p>
                    </div>
                )}
            </div>

            <Navbar />
        </div>
    )
}

export default Home