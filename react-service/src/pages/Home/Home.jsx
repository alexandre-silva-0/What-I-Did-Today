import Navbar from '../../components/Navbar'
import TaskCard from '../../components/TaskCard'
import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles.container}>
            <header>
                <p>Hoje</p>
                <h1>11 de Novembro</h1>
            </header>

            <div className={styles.card_list}>
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
            </div>

            <Navbar />
        </div>
    )
}

export default Home