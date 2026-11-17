import styles from './CreateAssignment.module.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createAssignment, clearMessage } from '../../slices/taskSlice'

//components
import PageHeader from '../../components/PageHeader'
import AssignmentForm from '../../components/AssignmentForm'

const CreateAssignment = () => {
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

    const handleSubmit = async (assignment) => {
        try {
            await dispatch(createAssignment(assignment)).unwrap()
            navigate('/activities', { replace: true })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.container}>
            <PageHeader showBack label="Nova pendência" title="Adicionar pendência" />

            <AssignmentForm
                onSubmit={handleSubmit}
                submitLabel="Adicionar"
                error={typeof error === 'string' ? error : null}
            />
        </div>
    )
}

export default CreateAssignment
