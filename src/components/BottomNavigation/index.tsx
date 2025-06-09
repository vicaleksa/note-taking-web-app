import { NavLink } from 'react-router';
import clsx from 'clsx';
import styles from './style.module.css';
import IconHome from '../../assets/images/IconHome';
import IconSearch from '../../assets/images/IconSearch';
import IconArchive from '../../assets/images/IconArchive';
import IconTag from '../../assets/images/IconTag';
import IconSettings from '../../assets/images/IconSettings';

const getNavClassName = ({ isActive }: { isActive: boolean }) => clsx(
    styles.iconButton,
    { [styles.iconButtonActive]: isActive },
);

export default function BottomNavigation() {
    return (
        <div className={styles.navbar}>
            <NavLink
                to="/"
                className={getNavClassName}
            >
                <IconHome />
                <span className={styles.text}>Home</span>
            </NavLink>
            <NavLink
                to="/search"
                className={getNavClassName}
            >
                <IconSearch />
                <span className={styles.text}>Search</span>
            </NavLink>
            <NavLink
                to="/archived"
                className={getNavClassName}
            >
                <IconArchive />
                <span className={styles.text}>Archived</span>
            </NavLink>
            <NavLink
                to="/tags"
                className={getNavClassName}
            >
                <IconTag />
                <span className={styles.text}>Tags</span>
            </NavLink>
            <NavLink
                to="/settings"
                className={getNavClassName}
            >
                <IconSettings />
                <span className={styles.text}>Settings</span>
            </NavLink>
        </div>
    );
}
