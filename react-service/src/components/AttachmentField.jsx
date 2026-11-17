import styles from './AttachmentField.module.css'
import { useEffect, useMemo, useRef } from 'react'
import { attachmentUrl } from '../services/taskService'
import { ACCEPT, MAX_FILES, canPreview, formatSize, iconFor } from '../utils/attachments'

/**
 * Lista de anexos do formulário de tarefa.
 *
 * Props:
 * - attachments: anexos já salvos ({ id, originalName, size })
 * - files: arquivos novos escolhidos agora (File[]), ainda não enviados
 * - onAddFiles(FileList): chamado ao escolher arquivos
 * - onRemoveAttachment(id): tira um anexo salvo (só é apagado ao salvar)
 * - onRemoveFile(index): tira um arquivo novo da lista
 * - error: mensagem de validação (tipo/tamanho)
 */
const AttachmentField = ({
    attachments = [],
    files = [],
    onAddFiles,
    onRemoveAttachment,
    onRemoveFile,
    error,
}) => {
    const inputRef = useRef(null)

    // Miniaturas dos arquivos novos; liberadas quando a lista muda ou a tela fecha
    const previews = useMemo(
        () => files.map((file) => (canPreview(file.name) ? URL.createObjectURL(file) : null)),
        [files]
    )

    useEffect(() => {
        return () => previews.forEach((url) => url && URL.revokeObjectURL(url))
    }, [previews])

    const handleChange = (e) => {
        onAddFiles(e.target.files)
        // Permite escolher o mesmo arquivo de novo depois de remover
        e.target.value = ''
    }

    const isEmpty = attachments.length === 0 && files.length === 0

    return (
        <div className={styles.field}>
            {!isEmpty && (
                <ul className={styles.list}>
                    {attachments.map((attachment) => (
                        <li key={`saved-${attachment.id}`} className={styles.item}>
                            <a
                                href={attachmentUrl(attachment.id)}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.item_link}
                                title="Abrir anexo"
                            >
                                {canPreview(attachment.originalName) ? (
                                    <img
                                        src={attachmentUrl(attachment.id)}
                                        alt=""
                                        className={styles.thumb}
                                        loading="lazy"
                                    />
                                ) : (
                                    <span className={styles.icon}>
                                        <i className={`bi ${iconFor(attachment.originalName)}`} aria-hidden="true"></i>
                                    </span>
                                )}
                                <span className={styles.info}>
                                    <span className={styles.name}>{attachment.originalName}</span>
                                    <span className={styles.meta}>{formatSize(attachment.size)}</span>
                                </span>
                            </a>
                            <button
                                type="button"
                                className={styles.remove}
                                onClick={() => onRemoveAttachment(attachment.id)}
                                aria-label={`Remover ${attachment.originalName}`}
                                title="Remover"
                            >
                                <i className="bi bi-x-lg" aria-hidden="true"></i>
                            </button>
                        </li>
                    ))}

                    {files.map((file, index) => (
                        <li key={`new-${index}-${file.name}`} className={`${styles.item} ${styles.item_new}`}>
                            <span className={styles.item_link}>
                                {previews[index] ? (
                                    <img src={previews[index]} alt="" className={styles.thumb} />
                                ) : (
                                    <span className={styles.icon}>
                                        <i className={`bi ${iconFor(file.name)}`} aria-hidden="true"></i>
                                    </span>
                                )}
                                <span className={styles.info}>
                                    <span className={styles.name}>{file.name}</span>
                                    <span className={styles.meta}>
                                        {formatSize(file.size)} · <span className={styles.badge}>novo</span>
                                    </span>
                                </span>
                            </span>
                            <button
                                type="button"
                                className={styles.remove}
                                onClick={() => onRemoveFile(index)}
                                aria-label={`Remover ${file.name}`}
                                title="Remover"
                            >
                                <i className="bi bi-x-lg" aria-hidden="true"></i>
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <input
                ref={inputRef}
                id="attachments"
                type="file"
                multiple
                accept={ACCEPT}
                className={styles.input}
                onChange={handleChange}
            />
            <button
                type="button"
                className={styles.add}
                onClick={() => inputRef.current?.click()}
                disabled={files.length >= MAX_FILES}
            >
                <i className="bi bi-plus-lg" aria-hidden="true"></i>
                {isEmpty ? 'Adicionar foto ou arquivo' : 'Adicionar mais'}
            </button>

            {error ? (
                <span className={styles.error} role="alert">{error}</span>
            ) : (
                <span className={styles.hint}>Fotos, PDF, Word, Excel ou texto · até 10 MB cada</span>
            )}
        </div>
    )
}

export default AttachmentField
