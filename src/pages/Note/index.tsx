import BottomNavigation from '../../components/BottomNavigation';
import PageHeader from '../../components/PageHeader';
import TopNavigation from '../../components/TopNavigation';
import styles from './style.module.css';

export default function Note() {
    return (
        <div className={styles.noteContainer}>
            <PageHeader />
            <main className={styles.content}>
                <TopNavigation />
            </main>
            <BottomNavigation />
        </div>
    );
}
