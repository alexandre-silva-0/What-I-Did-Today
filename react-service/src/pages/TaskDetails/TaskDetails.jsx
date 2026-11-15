//css
import styles from './TaskDetails.module.css'

//hooks
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//redux
import { deleteTask, getTaskById, updateTask } from '../../slices/taskSlice'
import { useDispatch, useSelector } from 'react-redux'

const TaskDetails = () => {

    const { task } = useSelector((state) => state.task)
    const [content, setContent] = useState(task.content)
    const [startedAt, setStartedAt] = useState(task.startedAt)
    const [finishedAt, setFinishedAt] = useState(task.finishedAt)
    const [deleteModal, setDeleteModal] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { id } = useParams()
    useEffect(() => {
        dispatch(getTaskById(id))
    }, [id, dispatch])

    useEffect(() => {
        if (task && String(task.id) === String(id)) {
            setContent(task.content || '')
            setStartedAt(task.startedAt || '')
            setFinishedAt(task.finishedAt || '')
        }
    }, [task, id])

    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedTask = {
            id: task.id,
            content,
            startedAt,
            finishedAt
        }

        dispatch(updateTask(updatedTask)).then(navigate('/'))
    }

    return (
        <div className={styles.container} >

            <header>
                <i
                    class="bi bi-arrow-left-circle"
                    onClick={() => navigate(-1)}
                ></i>
                <h1>Editar Tarefa</h1>
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

                <div className={styles.actions_div}>
                    <button type="submit" className={styles.submit_button}>
                        Editar
                    </button>
                    <button type='button' className={styles.delete_button} onClick={() => { setDeleteModal(true) }} ><i class="bi bi-trash3"></i></button>
                </div>
            </form>

            {deleteModal && (
                <div
                    className={styles.modal_overlay}
                    onClick={() => setDeleteModal(false)}
                >
                    <div
                        className={styles.delete_modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Apagar tarefa?</h2>
                        <div className={styles.delete_modal_buttons}>
                            <button
                                type="button"
                                onClick={() => setDeleteModal(false)}
                            >
                                Não
                            </button>
                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        await dispatch(deleteTask(task.id)).unwrap();
                                        setDeleteModal(false);
                                        navigate('/', { replace: true });
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }}
                            >
                                Sim
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
export default TaskDetails