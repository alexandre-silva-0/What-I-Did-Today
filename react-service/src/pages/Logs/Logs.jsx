//css
import styles from './Logs.module.css'

//hooks
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { getTasks } from '../../slices/taskSlice'
import { addDays, formatDayLabel, isValidDateInput, taskDate, todayInput } from '../../utils/date'

//components
import Navbar from '../../components/Navbar'
import PageHeader from '../../components/PageHeader'
import TaskCard from '../../components/TaskCard'

const Logs = () => {
    const dispatch = useDispatch()
    const { tasks } = useSelector((state) => state.task)

    const navigate = useNavigate()
    const today = todayInput()

    // A data fica na URL (?date=AAAA-MM-DD): o voltar do celular e o link
    // depois de registrar uma tarefa antiga abrem direto no dia certo
    const [searchParams, setSearchParams] = useSearchParams()
    const paramDate = searchParams.get('date')
    const date = isValidDateInput(paramDate) ? paramDate : today

    const handleDateChange = (value) => {
        if (!value) return
        setSearchParams(value === today ? {} : { date: value }, { replace: true })
    }

    const sortedTasks = tasks.filter((task) => taskDate(task) === date)

    // Cabeçalho no mesmo formato da Home: dia da semana em cima, data grande embaixo
    const [year, month, day] = date.split('-').map(Number)
    const selected = new Date(year, month - 1, day, 12)
    const weekday = date === today ? 'Hoje' : selected.toLocaleDateString('pt-BR', { weekday: 'long' })
    const isToday = date === today

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <PageHeader
                label={`Registros · ${weekday}`}
                title={selected.toLocaleDateString('pt-BR')}
                action={
                    <div className={styles.date_nav}>
                        <button
                            type="button"
                            className={styles.nav_button}
                            onClick={() => handleDateChange(addDays(date, -1))}
                            aria-label="Dia anterior"
                            title="Dia anterior"
                        >
                            <i className="bi bi-chevron-left" aria-hidden="true"></i>
                        </button>

                        {/* O input de data cobre o botão inteiro, invisível: tocar abre o calendário */}
                        <label className={`${styles.nav_button} ${styles.calendar_button}`} title="Escolher data">
                            <i className="bi bi-calendar3" aria-hidden="true"></i>
                            <input
                                type="date"
                                className={styles.date_input}
                                aria-label="Data dos registros"
                                value={date}
                                max={today}
                                onChange={(e) => handleDateChange(e.target.value)}
                                onClick={(e) => { try { e.currentTarget.showPicker() } catch { /* navegador sem showPicker */ } }}
                            />
                        </label>

                        <button
                            type="button"
                            className={styles.nav_button}
                            onClick={() => handleDateChange(addDays(date, 1))}
                            disabled={isToday}
                            aria-label="Próximo dia"
                            title="Próximo dia"
                        >
                            <i className="bi bi-chevron-right" aria-hidden="true"></i>
                        </button>
                    </div>
                }
            />

            <div className={styles.card_list}>
                {Array.isArray(sortedTasks) && sortedTasks.length > 0 ? (
                    sortedTasks.map((task) => (
                        <TaskCard task={task} key={task.id} />
                    ))
                ) : (
                    <p className={styles.empty_message}>
                        Nenhuma tarefa registrada nesta data.
                    </p>
                )}

                {date <= today && (
                    <button
                        type="button"
                        className={styles.add_button}
                        onClick={() => navigate(`/task/create?date=${date}`)}
                    >
                        <i className="bi bi-plus-lg" aria-hidden="true"></i>
                        Registrar tarefa · {formatDayLabel(date)}
                    </button>
                )}
            </div>

            <Navbar />
        </div>
    )
}

export default Logs