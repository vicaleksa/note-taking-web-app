import styles from './style.module.css';

interface AlertProps {
    text: string
}

export default function Alert({ text }: AlertProps) {
    return <div className={styles.text}>{text}</div>;
}
