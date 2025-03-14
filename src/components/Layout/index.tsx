import { Outlet } from 'react-router';
import BottomNavigation from '../BottomNavigation';
import PageHeader from '../PageHeader';
import styles from './style.module.css';

export default function Layout() {
    return (
        <div className={styles.layout}>
            <PageHeader />
            <main className={styles.content}>
                <Outlet />
            </main>
            <BottomNavigation />
        </div>
    );
}
