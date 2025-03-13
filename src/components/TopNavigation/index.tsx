import Button from '../Button';
import styles from './style.module.css';

export default function TopNavigation() {
    return (
        <div className={styles.navContainer}>
            <Button variant="ghost" buttonText="Go Back" leftIcon="arrow left" />
            <div className={styles.rightControl}>
                <Button variant="ghost" leftIcon="delete" />
                <Button variant="ghost" leftIcon="archive" />
                <Button variant="ghost" buttonText="Cancel" />
                <Button variant="ghost" buttonText="Save Note" color="blue" />
            </div>
        </div>
    );
}
