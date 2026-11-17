import styles from './Assignments.module.css'
import Navbar from '../../components/Navbar'
import PageHeader from '../../components/PageHeader'
import AssignmentCard from '../../components/AssignmentCard'

// ------------------------------------------------------------------
// DADOS FIXOS DE EXEMPLO: substituir pelos dados vindos da API/Redux.
// Mesmo formato do model Assignment: { id, content, status, deadline }
// ------------------------------------------------------------------
const daysFromToday = (days) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toISOString()
}

const mockAssignments = [
    { id: 1, content: 'Ligar o React na rota /api/assignments', status: 'in_progress', deadline: daysFromToday(0) },
    { id: 2, content: 'Revisar o tratamento de erros da API', status: 'pending', deadline: daysFromToday(3) },
    { id: 3, content: 'Configurar Cloudflare Access', status: 'pending', deadline: daysFromToday(-2) },
    { id: 4, content: 'Migrar o front para Vite', status: 'pending', deadline: null },
    { id: 5, content: 'Corrigir CSS quebrado em produção', status: 'done', deadline: daysFromToday(-1) },
]

const Assignments = () => {
    const assignments = mockAssignments
    const openCount = assignments.filter((a) => a.status !== 'done').length

    return (
        <div className={styles.container}>
            <PageHeader
                label="Pendências"
                title={openCount === 0 ? 'Tudo em dia' : `${openCount} em aberto`}
                action={
                    // TODO: abrir o formulário de nova pendência
                    <button
                        type="button"
                        className={styles.add_button}
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
