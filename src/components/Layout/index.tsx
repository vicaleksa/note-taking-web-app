import { Outlet } from 'react-router';
import BottomNavigation from '../BottomNavigation';
import PageHeader from '../PageHeader';
import styles from './style.module.css';

export default function Layout() {
    return (
        <div className={styles.layout}>
            <div className={styles.scrollable}>
                <PageHeader />
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
            <div className={styles.fixed}>
                <BottomNavigation />
            </div>
        </div>
    );
}
