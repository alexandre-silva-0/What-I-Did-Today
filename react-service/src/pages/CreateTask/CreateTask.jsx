import styles from './CreateTask.module.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createTask, uploadAttachments, clearMessage } from '../../slices/taskSlice'

//components
import PageHeader from '../../components/PageHeader'
import TaskForm from '../../components/TaskForm'

const CreateTask = () => {
    const { error } = useSelector((state) => state.task)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Some com o erro depois de alguns segundos
    useEffect(() => {
        if (!error) return
        const timer = setTimeout(() => {
            dispatch(clearMessage())
        }, 3000)
        return () => clearTimeout(timer)
    }, [error, dispatch])

    const handleSubmit = async (task, { files }) => {
        let created

        try {
            created = await dispatch(createTask(task)).unwrap()
        } catch (error) {
            console.error(error)
            return
        }

        if (files.length > 0) {
            try {
                await dispatch(uploadAttachments({ taskId: created.data.id, files })).unwrap()
            } catch (error) {
                // A tarefa já foi salva: abre a edição para ela tentar enviar os anexos de novo
                console.error(error)
                navigate(`/task/${created.data.id}`, { replace: true })
                return
            }
        }

        navigate('/', { replace: true })
    }

    return (
        <div className={styles.container}>
            <PageHeader showBack label="Novo registro" title="Registrar tarefa" />

            <TaskForm
                onSubmit={handleSubmit}
                submitLabel="Registrar"
                error={typeof error === 'string' ? error : null}
            />
        </div>
    )
}

export default CreateTask
