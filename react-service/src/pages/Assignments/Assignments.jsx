import styles from './Assignments.module.css'
import Navbar from '../../components/Navbar'
import PageHeader from '../../components/PageHeader'
import AssignmentCard from '../../components/AssignmentCard'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAssignments } from '../../slices/taskSlice'


const Assignments = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { assignments } = useSelector((state) => state.task)

    useEffect(() => {
        dispatch(getAssignments())
    }, [dispatch])


    const openCount = assignments.filter((a) => a.status !== 'done').length

    return (
        <div className={styles.container}>
            <PageHeader
                label="Pendências"
                title={openCount === 0 ? 'Tudo em dia' : `${openCount} em aberto`}
                action={
                    <button
                        type="button"
                        className={styles.add_button}
                        onClick={() => navigate('/assignment/create')}
                        aria-label="Adicionar pendência"
                        title="Adicionar pendência"
                    >
                        <i className="bi bi-plus-lg" aria-hidden="true"></i>
                    </button>
                }
            />

            <div className={styles.card_list}>
                {assignments.map((assignment) => (
                    <AssignmentCard assignment={assignment} key={assignment.id} />
                ))}

                {assignments.length === 0 && (
                    <div className={styles.no_assignments}>
                        <h3>Nenhuma pendência cadastrada.</h3>
                        <p>Aproveite o descanso ;)</p>
                    </div>
                )}
            </div>

            <Navbar />
        </div>
    )
}

export default Assignments
