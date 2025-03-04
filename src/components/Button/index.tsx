import { JSX } from 'react';
import clsx from 'clsx';
import styles from './style.module.css';

type ButtonProps = {
    variant: 'primary' | 'secondary' | 'outlined';
    buttonText: string;
    leftIcon?: JSX.Element
}

export default function Button({ variant, buttonText, leftIcon }: ButtonProps) {
    return (
        <button
            type="button"
            className={clsx(styles.button, {
                [styles.buttonPrimary]: variant === 'primary',
                [styles.buttonSecondary]: variant === 'secondary',
                [styles.buttonOutlined]: variant === 'outlined',
            })}
        >
            {leftIcon}
            {buttonText}
        </button>
    );
}
