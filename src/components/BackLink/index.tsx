import { Link } from 'react-router';
import IconArrowLeft from '../Icons/IconArrowLeft';
import styles from './style.module.css';

export default function BackLink() {
    return (
        <Link
            to=".."
            relative="path"
            className={styles.backButton}
        >
            <IconArrowLeft className={styles.backIcon} />
            Go Back
        </Link>
    );
}
