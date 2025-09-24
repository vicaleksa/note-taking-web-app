import { NavLink } from 'react-router';
import clsx from 'clsx';
import Icon from '../Icons/Icon';
import styles from './style.module.css';

interface MenuItemProps {
    link: string,
    leftIcon: 'sun' | 'font' | 'lock' | 'logout',
    text: string,
}

const getNavClassName = ({ isActive }: { isActive: boolean }) => clsx(
    styles.menuContainer,
    { [styles.menuContainerActive]: isActive },
);

export default function MenuItem({
    link,
    leftIcon,
    text,
}: MenuItemProps) {
    return (
        <NavLink to={link} className={getNavClassName}>
            <Icon type={leftIcon} className={styles.icon} />
            <p className={styles.text}>{text}</p>
        </NavLink>
    );
}
