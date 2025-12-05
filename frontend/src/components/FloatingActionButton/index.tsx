import { Link } from 'react-router';
import styles from './style.module.css';
import Icon, { IconType } from '../Icons/Icon';

type FloatingActionButtonProps = {
    ariaLabel: string;
    icon: IconType;
}

export default function FloatingActionButton({ ariaLabel, icon }: FloatingActionButtonProps) {
    return (
        <Link
            to="/new"
            aria-label={ariaLabel}
            className={styles.FAB}
        >
            <Icon type={icon} className={styles.icon} />
        </Link>
    );
}
