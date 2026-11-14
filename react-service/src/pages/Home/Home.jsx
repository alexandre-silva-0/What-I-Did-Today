import { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import TaskCard from '../../components/TaskCard'
import styles from './Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks } from '../../slices/taskSlice'

const Home = () => {

    const dispatch = useDispatch()
    const { tasks } = useSelector((state) => state.task)

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <header>
                <p>Hoje</p>
                <h1>11 de Novembro</h1>
            </header>

            <div className={styles.card_list}>
                {tasks && tasks.map((task) => (
                    <TaskCard task={task} key={task.id} />
                ))}
            </div>

            <Navbar />
        </div>
    )
}

export default Home