import clsx from 'clsx';
import styles from './style.module.css';
import Icon from '../../assets/images/Icon';

type ButtonProps = {
    variant: 'primary' | 'secondary' | 'outlined' | 'ghost';
    buttonText?: string;
    leftIcon?: string;
    color?: string
}

export default function Button({
    variant, buttonText, leftIcon, color,
}: ButtonProps) {
    return (
        <button
            type="button"
            className={clsx(styles.button, {
                [styles.buttonPrimary]: variant === 'primary',
                [styles.buttonSecondary]: variant === 'secondary',
                [styles.buttonOutlined]: variant === 'outlined',
                [styles.buttonGhost]: variant === 'ghost',
                [styles.buttonGhostBlue]: color === 'blue',
            })}
        >
            {leftIcon && (
                <Icon
                    type={leftIcon}
                    className={clsx(styles.leftIcon, {
                        [styles.iconGhost]: variant === 'ghost',
                    })}
                />
            )}
            {buttonText}
        </button>
    );
}
