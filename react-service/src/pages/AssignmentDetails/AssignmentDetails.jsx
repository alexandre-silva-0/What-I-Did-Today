import styles from './AssignmentDetails.module.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAssignment, getAssignmentById, updateAssignment } from '../../slices/taskSlice'

//components
import PageHeader from '../../components/PageHeader'
import AssignmentForm from '../../components/AssignmentForm'

const AssignmentDetails = () => {
    const { assignment, loading } = useSelector((state) => state.task)
    const [deleteModal, setDeleteModal] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getAssignmentById(id))
    }, [id, dispatch])

    // O store pode ainda ter a pendência aberta anteriormente; só usa se for a da URL
    const isLoaded = assignment && String(assignment.id) === String(id)

    const label = isLoaded && assignment.createdAt
        ? `Criada em ${new Date(assignment.createdAt).toLocaleDateString('pt-BR')}`
        : 'Pendência'

    const handleSubmit = async (values) => {
        try {
            await dispatch(updateAssignment({ id: assignment.id, ...values })).unwrap()
            navigate('/activities', { replace: true })
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async () => {
        try {
            await dispatch(deleteAssignment(assignment.id)).unwrap()
            setDeleteModal(false)
            navigate('/activities', { replace: true })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.container}>
            <PageHeader showBack label={label} title="Editar pendência" />

            {isLoaded && (
                <AssignmentForm
                    key={assignment.id}
                    initialValues={assignment}
                    onSubmit={handleSubmit}
                    submitLabel="Salvar alterações"
                    onDelete={() => setDeleteModal(true)}
                />
            )}

            {!isLoaded && !loading && (
                <div className={styles.not_found}>
                    <h3>Pendência não encontrada.</h3>
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
                        <h2 id="delete-title">Apagar pendência?</h2>
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

export default AssignmentDetails
