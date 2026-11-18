import { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import PageHeader from '../../components/PageHeader'
import TaskCard from '../../components/TaskCard'
import styles from './Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks } from '../../slices/taskSlice'
import { taskDate, todayInput } from '../../utils/date'

const Home = () => {
    const dispatch = useDispatch()
    const { tasks } = useSelector((state) => state.task)
    const today = new Date()
    const todayString = todayInput()

    const sortedTasks = Array.isArray(tasks)
        ? tasks.filter((task) => taskDate(task) === todayString)
        : []

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <PageHeader
                label={`Hoje · ${today.toLocaleDateString('pt-BR', { weekday: 'long' })}`}
                title={today.toLocaleDateString('pt-BR')}
            />

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