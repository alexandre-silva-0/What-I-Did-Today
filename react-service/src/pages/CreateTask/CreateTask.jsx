//css
import styles from './CreateTask.module.css'

//hooks
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//redux
import { createTask } from '../../slices/taskSlice'
import { useDispatch } from 'react-redux'

const CreateTask = () => {

    const [content, setContent] = useState("")
    const [startedAt, setStartedAt] = useState("")
    const [finishedAt, setFinishedAt] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const task = {
            content, startedAt, finishedAt
        }

        dispatch(createTask(task)).then(navigate('/'))
    }

    return (
        <div className={styles.container} >

            <header>
                <i
                    class="bi bi-arrow-left-circle"
                    onClick={() => navigate(-1)}
                ></i>
                <h1>Registrar Tarefa</h1>
            </header>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input_group}>
                    <label htmlFor="content">Conteúdo da tarefa</label>
                    <textarea
                        id="content"
                        rows={4}
                        placeholder="Hoje eu fiz..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className={styles.time_row}>
                    <div className={styles.input_group}>
                        <label htmlFor="startedAt">Começou às</label>
                        <input
                            id="startedAt"
                            type="time"
                            value={startedAt}
                            onChange={(e) => setStartedAt(e.target.value)}
                        />
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="finishedAt">Terminou às</label>
                        <input
                            id="finishedAt"
                            type="time"
                            value={finishedAt}
                            onChange={(e) => setFinishedAt(e.target.value)}
                        />
                    </div>
                </div>

                <button type="submit" className={styles.submit_button}>
                    Registrar
                </button>
            </form>

        </div>
    )
}
export default CreateTask