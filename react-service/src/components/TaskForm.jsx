import styles from './TaskForm.module.css'
import { useState } from 'react'
import { formatTime, getDuration } from '../utils/time'
import { validateFiles } from '../utils/attachments'
import { addDays, formatDayLabel, todayInput } from '../utils/date'
import AttachmentField from './AttachmentField'

// Limite da coluna "content" (STRING = VARCHAR(255)) no model Task do back
const MAX_CONTENT = 255

const DEFAULT_VALUES = {
    content: '',
    date: null, // null = hoje
    startedAt: '09:00',
    finishedAt: '10:00',
}

/**
 * Formulário de tarefa usado na criação e na edição.
 *
 * Props:
 * - initialValues: { content, date, startedAt, finishedAt, attachments } (date "AAAA-MM-DD",
 *   horários "HH:MM" ou "HH:MM:SS"). Campos que faltarem usam o padrão.
 * - onSubmit(values, attachmentChanges): values = { content, date, startedAt, finishedAt } e
 *   attachmentChanges = { files: File[] novos, removedAttachmentIds: number[] }
 * - submitLabel: texto do botão principal
 * - error: mensagem de erro para mostrar acima dos botões
 * - onDelete: se informado, mostra o botão de apagar ao lado do principal
 *
 * Os valores iniciais só são lidos na montagem. Para recarregar o formulário
 * com outra tarefa, troque a `key` do componente (ex.: key={task.id}).
 */
const TaskForm = ({
    initialValues: initialProp = DEFAULT_VALUES,
    onSubmit,
    submitLabel = 'Salvar',
    error,
    onDelete,
}) => {
    const initialValues = { ...DEFAULT_VALUES, ...initialProp }
    const today = todayInput()
    const yesterday = addDays(today, -1)

    const [content, setContent] = useState(initialValues.content ?? '')
    const [date, setDate] = useState(initialValues.date ?? today)
    const [startedAt, setStartedAt] = useState(formatTime(initialValues.startedAt))
    const [finishedAt, setFinishedAt] = useState(formatTime(initialValues.finishedAt))

    // Anexos: os salvos que continuam, os removidos e os arquivos novos (enviados ao salvar)
    const [attachments, setAttachments] = useState(initialValues.attachments ?? [])
    const [removedAttachmentIds, setRemovedAttachmentIds] = useState([])
    const [files, setFiles] = useState([])
    const [fileError, setFileError] = useState(null)

    const duration = getDuration(startedAt, finishedAt)
    const sameTime = startedAt && finishedAt && startedAt === finishedAt
    const isFutureDate = date > today
    const canSubmit = content.trim().length > 0 && Boolean(startedAt) && Boolean(date) && !isFutureDate
    const nearLimit = content.length >= MAX_CONTENT - 20

    const handleAddFiles = (fileList) => {
        const { accepted, error } = validateFiles(Array.from(fileList), files.length)
        setFiles((current) => [...current, ...accepted])
        setFileError(error)
    }

    const handleRemoveFile = (index) => {
        setFiles((current) => current.filter((_, i) => i !== index))
        setFileError(null)
    }

    const handleRemoveAttachment = (id) => {
        setAttachments((current) => current.filter((attachment) => attachment.id !== id))
        setRemovedAttachmentIds((current) => [...current, id])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!canSubmit) return

        onSubmit(
            {
                content: content.trim(),
                date,
                startedAt,
                finishedAt: finishedAt || null,
            },
            { files, removedAttachmentIds }
        )
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {/* ---------- O que foi feito ---------- */}
            <section className={styles.section}>
                <div className={styles.section_title}>
                    <label htmlFor="content" className={styles.section_label}>
                        <i className="bi bi-pencil" aria-hidden="true"></i>
                        O que você fez?
                    </label>
                    <span className={`${styles.counter} ${nearLimit ? styles.counter_warn : ''}`}>
                        {content.length}/{MAX_CONTENT}
                    </span>
                </div>

                <textarea
                    id="content"
                    className={styles.textarea}
                    rows={4}
                    maxLength={MAX_CONTENT}
                    placeholder="Hoje eu fiz..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </section>

            {/* ---------- Horários ---------- */}
            <section className={styles.section}>
                <div className={styles.section_title}>
                    <span className={styles.section_label}>
                        <i className="bi bi-clock" aria-hidden="true"></i>
                        Quando?
                    </span>
                </div>

                {/* Dia: atalhos para hoje/ontem e calendário para os outros dias */}
                <div className={styles.day_row} role="group" aria-label="Dia da tarefa">
                    <button
                        type="button"
                        className={`${styles.day_chip} ${date === today ? styles.day_chip_active : ''}`}
                        onClick={() => setDate(today)}
                        aria-pressed={date === today}
                    >
                        Hoje
                    </button>
                    <button
                        type="button"
                        className={`${styles.day_chip} ${date === yesterday ? styles.day_chip_active : ''}`}
                        onClick={() => setDate(yesterday)}
                        aria-pressed={date === yesterday}
                    >
                        Ontem
                    </button>
                    <label
                        className={`${styles.day_picker} ${date !== today && date !== yesterday ? styles.day_chip_active : ''}`}
                    >
                        <i className="bi bi-calendar3" aria-hidden="true"></i>
                        <span>{date !== today && date !== yesterday ? formatDayLabel(date) : 'Outro dia'}</span>
                        <input
                            id="date"
                            type="date"
                            className={styles.day_input}
                            value={date}
                            max={today}
                            onChange={(e) => e.target.value && setDate(e.target.value)}
                            // No computador, abre o calendário ao clicar em qualquer parte do botão
                            onClick={(e) => { try { e.currentTarget.showPicker() } catch { /* navegador sem showPicker */ } }}
                            aria-label="Escolher outro dia"
                        />
                    </label>
                </div>

                {isFutureDate && (
                    <span className={`${styles.hint} ${styles.hint_error}`}>Não dá para registrar em dias futuros.</span>
                )}

                <div className={styles.time_row}>
                    <div className={styles.time_field}>
                        <label htmlFor="startedAt">Início</label>
                        <input
                            id="startedAt"
                            type="time"
                            className={styles.time_input}
                            value={startedAt}
                            onChange={(e) => setStartedAt(e.target.value)}
                            required
                        />
                    </div>

                    <i className={`bi bi-arrow-right ${styles.time_arrow}`} aria-hidden="true"></i>

                    <div className={styles.time_field}>
                        <label htmlFor="finishedAt">Fim</label>
                        <input
                            id="finishedAt"
                            type="time"
                            className={styles.time_input}
                            value={finishedAt}
                            onChange={(e) => setFinishedAt(e.target.value)}
                        />
                    </div>
                </div>

                {duration && (
                    <span className={styles.duration}>
                        <i className="bi bi-hourglass-split" aria-hidden="true"></i>
                        {duration}
                    </span>
                )}
                {!finishedAt && (
                    <span className={styles.hint}>Sem horário de fim: fica como em andamento.</span>
                )}
                {sameTime && (
                    <span className={styles.hint}>Início e fim estão iguais.</span>
                )}
            </section>

            {/* ---------- Anexos ---------- */}
            <section className={styles.section}>
                <div className={styles.section_title}>
                    <label htmlFor="attachments" className={styles.section_label}>
                        <i className="bi bi-paperclip" aria-hidden="true"></i>
                        Anexos
                    </label>
                    {(attachments.length + files.length) > 0 && (
                        <span className={styles.counter}>{attachments.length + files.length}</span>
                    )}
                </div>

                <AttachmentField
                    attachments={attachments}
                    files={files}
                    onAddFiles={handleAddFiles}
                    onRemoveAttachment={handleRemoveAttachment}
                    onRemoveFile={handleRemoveFile}
                    error={fileError}
                />
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
                        aria-label="Apagar tarefa"
                        title="Apagar tarefa"
                    >
                        <i className="bi bi-trash3" aria-hidden="true"></i>
                    </button>
                )}
            </div>
        </form>
    )
}

export default TaskForm
