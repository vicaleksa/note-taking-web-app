import MenuItem from '../../components/MenuItem';
import styles from './style.module.css';

export default function Settings() {
    return (
        <>
            <h1 className={styles.title}>Settings</h1>
            <div className={styles.menu}>
                <MenuItem
                    link="/settings/theme"
                    leftIcon="sun"
                    text="Color Theme"
                />
                <MenuItem
                    link="/settings/font"
                    leftIcon="font"
                    text="Font Theme"
                />
                <MenuItem
                    link="/settings/password"
                    leftIcon="lock"
                    text="Change Password"
                />
                <div className={styles.divider} aria-hidden="true" />
                <MenuItem
                    link="/settings/logout"
                    leftIcon="logout"
                    text="Logout"
                />
            </div>
        </>
    );
}
