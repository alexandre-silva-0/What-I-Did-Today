import styles from './PageHeader.module.css'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Cabeçalho "vidro" fixo no topo das telas.
 *
 * Props:
 * - label: texto pequeno em cima (ex.: "Hoje")
 * - title: título grande (opcional)
 * - showBack: mostra o botão de voltar
 * - action: elemento à direita (ex.: um botão de adicionar)
 * - children: conteúdo extra abaixo do título, na largura toda (ex.: um filtro)
 */
const PageHeader = ({ label, title, showBack = false, action, children }) => {
    const navigate = useNavigate()
    const location = useLocation()

    // "default" = página aberta direto pela URL, sem histórico dentro do app
    const handleBack = () => {
        if (location.key !== 'default') {
            navigate(-1)
        } else {
            navigate('/')
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.top_row}>
                {showBack && (
                    <button
                        type="button"
                        className={styles.back_button}
                        onClick={handleBack}
                        aria-label="Voltar"
                        title="Voltar"
                    >
                        <i className="bi bi-chevron-left" aria-hidden="true"></i>
                    </button>
                )}

                <div className={styles.text}>
                    {label && <p className={styles.label}>{label}</p>}
                    {title && <h1 className={styles.title}>{title}</h1>}
                </div>

                {action && <div className={styles.action}>{action}</div>}
            </div>

            {children && <div className={styles.extra}>{children}</div>}
        </header>
    )
}

export default PageHeader
