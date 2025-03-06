import clsx from 'clsx';
import styles from './style.module.css';
import Icon from '../../assets/images/Icon';

type FABprops = {
    size: 'small' | 'large';
    ariaLabel: string;
    icon: string
}

export default function FAB({ size, ariaLabel, icon }: FABprops) {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            className={clsx(styles.FAB, {
                [styles.FABsmall]: size === 'small',
                [styles.FABlarge]: size === 'large',
            })}
        >
            <Icon type={icon} className={styles.icon} />
        </button>
    );
}
