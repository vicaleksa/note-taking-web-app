import styles from './style.module.css';
import IconHome from '../../assets/images/IconHome';
import IconSearch from '../../assets/images/IconSearch';
import IconArchive from '../../assets/images/IconArchive';
import IconTag from '../../assets/images/IconTag';
import IconSettings from '../../assets/images/IconSettings';

export default function BottomNavigation() {
    return (
        <div className={styles.navbar}>
            <a href="#home" className={styles.iconButton}>
                <IconHome />
                <span className={styles.text}>Home</span>
            </a>
            <a href="#search" className={styles.iconButton}>
                <IconSearch />
                <span className={styles.text}>Search</span>
            </a>
            <a href="#archived" className={styles.iconButton}>
                <IconArchive />
                <span className={styles.text}>Archived</span>
            </a>
            <a href="#tags" className={styles.iconButton}>
                <IconTag />
                <span className={styles.text}>Tags</span>
            </a>
            <a href="#settings" className={styles.iconButton}>
                <IconSettings />
                <span className={styles.text}>Settings</span>
            </a>
        </div>
    );
}
