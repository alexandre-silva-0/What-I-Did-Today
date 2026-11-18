import styles from './CreateTask.module.css'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createTask, uploadAttachments, clearMessage } from '../../slices/taskSlice'

//components
import PageHeader from '../../components/PageHeader'
import TaskForm from '../../components/TaskForm'
import { isValidDateInput, todayInput } from '../../utils/date'

const CreateTask = () => {
    const { error } = useSelector((state) => state.task)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // /task/create?date=AAAA-MM-DD já abre o formulário naquele dia (vindo dos Registros)
    const [searchParams] = useSearchParams()
    const paramDate = searchParams.get('date')
    const initialDate = isValidDateInput(paramDate) && paramDate <= todayInput() ? paramDate : null

    // Tarefa de hoje volta para a Home; de outro dia, para os Registros daquele dia
    const pageFor = (date) => (date === todayInput() ? '/' : `/tasks/logs?date=${date}`)

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

        navigate(pageFor(task.date), { replace: true })
    }

    return (
        <div className={styles.container}>
            <PageHeader showBack label="Novo registro" title="Registrar tarefa" />

            <TaskForm
                initialValues={{ date: initialDate }}
                onSubmit={handleSubmit}
                submitLabel="Registrar"
                error={typeof error === 'string' ? error : null}
            />
        </div>
    )
}

export default CreateTask
