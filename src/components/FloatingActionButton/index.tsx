import clsx from 'clsx';
import { Link } from 'react-router';
import styles from './style.module.css';
import Icon, { IconType } from '../Icons/Icon';

type FloatingActionButtonProps = {
    size: 'small' | 'large';
    ariaLabel: string;
    icon: IconType;
}

export default function FloatingActionButton({ size, ariaLabel, icon }: FloatingActionButtonProps) {
    return (
        <Link
            to="/new"
            aria-label={ariaLabel}
            className={clsx(styles.FAB, {
                [styles.FABsmall]: size === 'small',
                [styles.FABlarge]: size === 'large',
            })}
        >
            <Icon type={icon} className={styles.icon} />
        </Link>
    );
}
