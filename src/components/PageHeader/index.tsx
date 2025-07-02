import { NavLink } from 'react-router';
import styles from './style.module.css';
import logo from '../../assets/images/logo.svg';

export default function PageHeader() {
    return (
        <header className={styles.header}>
            <NavLink to="/">
                <img src={logo} alt="" />
            </NavLink>
        </header>
    );
}
