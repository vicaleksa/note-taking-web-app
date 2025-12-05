import { Link } from 'react-router';
import IconArrowLeft from '../Icons/IconArrowLeft';
import styles from './style.module.css';

interface BackLinkProps {
    text: string,
}

export default function BackLink({ text }: BackLinkProps) {
    return (
        <Link
            to=".."
            relative="path"
            className={styles.backButton}
            aria-label={text}
        >
            <IconArrowLeft className={styles.backIcon} />
            {text}
        </Link>
    );
}
