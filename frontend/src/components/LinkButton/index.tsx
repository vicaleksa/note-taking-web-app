import { Link } from 'react-router';
import clsx from 'clsx';
import styles from './style.module.css';

type LinkButtonProps = {
    variant: 'primary' | 'accent',
    href: string,
    children?: React.ReactNode,
}

export default function LinkButton({
    variant, href, children,
}: LinkButtonProps) {
    return (
        <Link
            to={href}
            relative="path"
            className={clsx(styles.primaryLink, {
                [styles.accentLink]: variant === 'accent',
            })}
        >
            {children}
        </Link>
    );
}
