//css
import styles from './CreateTask.module.css'

//hooks
import { useState } from 'react'

//redux
import { createTask } from '../../slices/taskSlice'
import { useDispatch } from 'react-redux'

const CreateTask = () => {

    const [content, setContent] = useState("")
    const [startedAt, setStartedAt] = useState("")
    const [finishedAt, setFinishedAt] = useState("")

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        const task = {
            content, startedAt, finishedAt
        }

        dispatch(createTask(task))
    }

    return (
        <div className={styles.container} >

            <h1>Registrar tarefa</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='hoje eu fiz...'
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                <input
                    type="text"
                    placeholder='09:00'
                    onChange={(e) => setStartedAt(e.target.value)}
                    value={startedAt}
                />
                <input
                    type="text"
                    placeholder='10:00'
                    onChange={(e) => setFinishedAt(e.target.value)}
                    value={finishedAt}
                />
                <div className={styles.actions_section} >
                    <button type='submit'>Registrar</button>
                </div>
            </form>



        </div>
    )
}
export default CreateTask