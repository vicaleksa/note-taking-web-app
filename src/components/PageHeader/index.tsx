import styles from './style.module.css';
import logo from '../../assets/images/logo.svg';

export default function PageHeader() {
    return (
        <header className={styles.header}>
            <img src={logo} alt="" />
        </header>
    );
}
