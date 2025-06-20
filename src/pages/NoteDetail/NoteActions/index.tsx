import Button from '../../../components/Button';
import styles from './style.module.css';

export default function NoteActions() {
    return (
        <div className={styles.navContainer}>
            <Button variant="ghost" buttonText="Go Back" leftIcon="arrowLeft" />
            <div className={styles.rightControl}>
                <Button variant="ghost" leftIcon="delete" />
                <Button variant="ghost" leftIcon="archive" />
                <Button variant="ghost" buttonText="Cancel" />
                <Button variant="ghost" buttonText="Save Note" color="blue" />
            </div>
        </div>
    );
}
