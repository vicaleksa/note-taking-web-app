import { Link } from 'react-router';
import Icon from '../Icons/Icon';
import styles from './style.module.css';

interface MenuItemProps {
    link: string,
    leftIcon: 'sun' | 'font' | 'lock' | 'logout',
    text: string,
    rightIcon?: 'chevronRight',
}

export default function MenuItem({
    link,
    leftIcon,
    text,
    rightIcon,
}: MenuItemProps) {
    return (
        <Link to={link} className={styles.container}>
            <Icon type={leftIcon} className={styles.icon} />
            <p className={styles.text}>{text}</p>
            {rightIcon && <Icon type={rightIcon} />}
        </Link>
    );
}
