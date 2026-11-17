import styles from './AssignmentForm.module.css'
import { useState } from 'react'

// Mesmos valores do ENUM do model Assignment no back-end
const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pendente', icon: 'bi-circle' },
    { value: 'in_progress', label: 'Em andamento', icon: 'bi-arrow-repeat' },
    { value: 'done', label: 'Concluído', icon: 'bi-check2-circle' },
]

const DEFAULT_VALUES = {
    content: '',
    status: 'pending',
    deadline: null,
}

// ISO do banco -> "AAAA-MM-DD" no fuso local, para o <input type="date">
const toDateInput = (deadline) =>
    deadline ? new Date(deadline).toLocaleDateString('en-CA') : ''

// "AAAA-MM-DD" -> fim do dia no fuso local, em ISO (evita o prazo cair no dia anterior)
const toDeadline = (date) =>
    date ? new Date(`${date}T23:59:00`).toISOString() : null

const todayInput = () => new Date().toLocaleDateString('en-CA')

/**
 * Formulário de pendência usado na criação e na edição.
 *
 * Props:
 * - initialValues: { content, status, deadline } (deadline em ISO ou null)
 * - onSubmit(values): chamado com { content, status, deadline }
 * - submitLabel: texto do botão principal
 * - error: mensagem de erro para mostrar acima dos botões
 * - onDelete: se informado, mostra o botão de apagar ao lado do principal
 *
 * Os valores iniciais só são lidos na montagem. Para recarregar o formulário
 * com outra pendência, troque a `key` do componente (ex.: key={assignment.id}).
 */
const AssignmentForm = ({
    initialValues = DEFAULT_VALUES,
    onSubmit,
    submitLabel = 'Salvar',
    error,
    onDelete,
}) => {
    const [content, setContent] = useState(initialValues.content ?? '')
    const [status, setStatus] = useState(initialValues.status ?? 'pending')
    const [deadline, setDeadline] = useState(toDateInput(initialValues.deadline))

    const canSubmit = content.trim().length > 0
    const isLate = deadline && deadline < todayInput() && status !== 'done'

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!canSubmit) return

        onSubmit({
            content: content.trim(),
            status,
            deadline: toDeadline(deadline),
        })
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {/* ---------- O que precisa ser feito ---------- */}
            <section className={styles.section}>
                <div className={styles.section_title}>
                    <label htmlFor="content" className={styles.section_label}>
                        <i className="bi bi-pencil" aria-hidden="true"></i>
                        O que precisa ser feito?
                    </label>
                </div>

                <textarea
                    id="content"
                    className={styles.textarea}
                    rows={4}
                    placeholder="Preciso..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </section>

            {/* ---------- Status ---------- */}
            <section className={styles.section}>
                <div className={styles.section_title}>
                    <span className={styles.section_label} id="status-label">
                        <i className="bi bi-flag" aria-hidden="true"></i>
                        Status
                    </span>
                </div>

                <div className={styles.status_group} role="radiogroup" aria-labelledby="status-label">
                    {STATUS_OPTIONS.map((option) => (
                        <label
                            key={option.value}
                            className={`${styles.status_option} ${styles[`status_${option.value}`]}`}
                        >
                            <input
                                type="radio"
                                name="status"
                                value={option.value}
                                checked={status === option.value}
                                onChange={() => setStatus(option.value)}
                            />
                            <i className={`bi ${option.icon}`} aria-hidden="true"></i>
                            {option.label}
                        </label>
                    ))}
                </div>
            </section>

            {/* ---------- Prazo ---------- */}
            <section className={styles.section}>
                <div className={styles.section_title}>
                    <label htmlFor="deadline" className={styles.section_label}>
                        <i className="bi bi-calendar-event" aria-hidden="true"></i>
                        Prazo
                    </label>

                    {deadline && (
                        <button
                            type="button"
                            className={styles.clear_button}
                            onClick={() => setDeadline('')}
                        >
                            Remover prazo
                        </button>
                    )}
                </div>

                <input
                    id="deadline"
                    type="date"
                    className={styles.date_input}
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />

                {!deadline && (
                    <span className={styles.hint}>Sem prazo: fica na lista até ser concluída.</span>
                )}
                {isLate && (
                    <span className={`${styles.hint} ${styles.hint_warn}`}>Essa data já passou.</span>
                )}
            </section>

            {error && (
                <p className={styles.error} role="alert">
                    <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
                    {error}
                </p>
            )}

            {/* ---------- Ações ---------- */}
            <div className={styles.actions}>
                <button type="submit" className={styles.submit} disabled={!canSubmit}>
                    <i className="bi bi-check2" aria-hidden="true"></i>
                    {submitLabel}
                </button>

                {onDelete && (
                    <button
                        type="button"
                        className={styles.delete}
                        onClick={onDelete}
                        aria-label="Apagar pendência"
                        title="Apagar pendência"
                    >
                        <i className="bi bi-trash3" aria-hidden="true"></i>
                    </button>
                )}
            </div>
        </form>
    )
}

export default AssignmentForm
