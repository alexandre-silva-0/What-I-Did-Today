import Navbar from '../../components/Navbar'
import TaskCard from '../../components/TaskCard'
import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.todaysdate} >Novembro de 11</h1>

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