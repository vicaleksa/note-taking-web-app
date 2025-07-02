import { Link } from 'react-router';
import Button from '../../../components/Button';
import styles from './style.module.css';
import IconArrowLeft from '../../../components/Icons/IconArrowLeft';

export default function NoteActions() {
    return (
        <div className={styles.navContainer}>
            <Link
                to=".."
                relative="path"
                className={styles.backButton}
            >
                <IconArrowLeft className={styles.backIcon} />
                Go Back
            </Link>
            <div className={styles.rightControl}>
                <Button variant="ghost" leftIcon="delete" />
                <Button variant="ghost" leftIcon="archive" />
                <Button variant="ghost" buttonText="Save Note" color="blue" />
            </div>
        </div>
    );
}
