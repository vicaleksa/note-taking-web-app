import clsx from 'clsx';
import styles from './style.module.css';
import Icon from '../../assets/images/Icon';

type ButtonProps = {
    variant: 'primary' | 'secondary' | 'outlined';
    buttonText: string;
    leftIcon?: string
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
            {leftIcon && (<Icon type={leftIcon} className={styles.leftIcon} />)}
            {buttonText}
        </button>
    );
}
