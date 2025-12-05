import { Link } from 'react-router';
import Icon, { IconType } from '../Icons/Icon';
import IconClose from '../Icons/IconClose';
import styles from './style.module.css';

interface ToastProps {
    icon: IconType,
    text: string,
    link?: string,
    linkText?: string,
    onClose: React.MouseEventHandler,
}

export default function Toast({
    icon,
    text,
    link,
    linkText,
    onClose,
}: ToastProps) {
    return (
        <div className={styles.container}>
            <Icon type={icon} className={styles.iconCheck} />
            <p className={styles.text}>{text}</p>
            <div className={styles.right}>
                {link && <Link to={link} className={styles.link}>{linkText}</Link>}
                <button type="button" className={styles.iconButton} onClick={onClose}>
                    <IconClose className={styles.iconClose} />
                </button>
            </div>
        </div>
    );
}
