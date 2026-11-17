import styles from './TaskDetails.module.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, getTaskById, updateTask } from '../../slices/taskSlice'

//components
import PageHeader from '../../components/PageHeader'
import TaskForm from '../../components/TaskForm'

const TaskDetails = () => {
    const { task, loading } = useSelector((state) => state.task)
    const [deleteModal, setDeleteModal] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getTaskById(id))
    }, [id, dispatch])

    // O store pode ainda ter a tarefa aberta anteriormente; só usa se for a da URL
    const isLoaded = task && String(task.id) === String(id)

    const label = isLoaded && task.createdAt
        ? `Registro de ${new Date(task.createdAt).toLocaleDateString('pt-BR')}`
        : 'Registro'

    const handleSubmit = async (values) => {
        try {
            await dispatch(updateTask({ id: task.id, ...values })).unwrap()
            navigate('/', { replace: true })
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async () => {
        try {
            await dispatch(deleteTask(task.id)).unwrap()
            setDeleteModal(false)
            navigate('/', { replace: true })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.container}>
            <PageHeader showBack label={label} title="Editar tarefa" />

            {isLoaded && (
                <TaskForm
                    key={task.id}
                    initialValues={task}
                    onSubmit={handleSubmit}
                    submitLabel="Salvar alterações"
                    onDelete={() => setDeleteModal(true)}
                />
            )}

            {!isLoaded && !loading && (
                <div className={styles.not_found}>
                    <h3>Tarefa não encontrada.</h3>
                    <p>Ela pode ter sido apagada.</p>
                </div>
            )}

            {deleteModal && (
                <div
                    className={styles.modal_overlay}
                    onClick={() => setDeleteModal(false)}
                >
                    <div
                        className={styles.delete_modal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className={styles.modal_icon} aria-hidden="true">
                            <i className="bi bi-trash3"></i>
                        </span>
                        <h2 id="delete-title">Apagar tarefa?</h2>
                        <p>Essa ação não pode ser desfeita.</p>

                        <div className={styles.delete_modal_buttons}>
                            <button
                                type="button"
                                className={styles.cancel_button}
                                onClick={() => setDeleteModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className={styles.confirm_button}
                                onClick={handleDelete}
                            >
                                Apagar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskDetails
