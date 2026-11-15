import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from '../slices/taskSlice';
import styles from './Toast.module.css';

const Toast = () => {
    const { message, error } = useSelector((state) => state.task);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            dispatch(clearMessage());
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, dispatch]);

    if (!message) return null;

    const toastType = error ? styles.error : styles.success;

    // Renderiza fora da árvore principal do app, direto no body
    return createPortal(
        <div
            className={`${styles.container} ${toastType}`}
            onClick={() => dispatch(clearMessage())}
            role="alert"
        >
            <span className={styles.icon}>{error ? '!' : '✓'}</span>
            <p className={styles.text}>{message}</p>
        </div>,
        document.body
    );
};

export default Toast;