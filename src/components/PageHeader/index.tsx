import { NavLink } from 'react-router';
import styles from './style.module.css';
import IconLogo from '../Icons/IconLogo';

export default function PageHeader() {
    return (
        <header className={styles.header}>
            <NavLink to="/" aria-label="Go to all notes">
                <IconLogo />
            </NavLink>
        </header>
    );
}
