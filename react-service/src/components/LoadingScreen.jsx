import styles from './LoadingScreen.module.css'

const LoadingScreen = () => {
    return (
        <div className={styles.overlay} role="status" aria-live="polite">
            <div className={styles.loader_box}>
                <div className={styles.dots}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                </div>
                <p className={styles.text}>Carregando...</p>
            </div>
        </div>
    )
}

export default LoadingScreen