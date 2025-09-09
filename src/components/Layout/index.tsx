import { Outlet } from 'react-router';
import Navigation from '../Navigation';
import PageHeader from '../PageHeader';
import styles from './style.module.css';

export default function Layout() {
    return (
        <div className={styles.layout}>
            <div className={styles.content}>
                <PageHeader />
                <main className={styles.mainContent}>
                    <Outlet />
                </main>
            </div>
            <nav className={styles.navigation}>
                <Navigation />
            </nav>
        </div>
    );
}
