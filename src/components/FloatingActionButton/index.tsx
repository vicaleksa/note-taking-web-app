import { JSX } from 'react';
import clsx from 'clsx';
import styles from './style.module.css';

type FABprops = {
    size: 'small' | 'large';
    icon: JSX.Element;
    ariaLabel: string
}

export default function FAB({ size, icon, ariaLabel }: FABprops) {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            className={clsx(styles.FAB, {
                [styles.FABsmall]: size === 'small',
                [styles.FABlarge]: size === 'large',
            })}
        >
            {icon}
        </button>
    );
}
