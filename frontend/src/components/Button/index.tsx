import clsx from 'clsx';
import styles from './style.module.css';
import Icon, { IconType } from '../Icons/Icon';

type ButtonProps = {
    variant: 'primary' | 'secondary' | 'ghost' | 'accentGhost' | 'danger' | 'iconButton';
    buttonText?: string;
    leftIcon?: IconType;
    onClick?: React.MouseEventHandler;
}

export default function Button({
    variant, buttonText, leftIcon, onClick,
}: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(styles.button, {
                [styles.buttonPrimary]: variant === 'primary',
                [styles.buttonSecondary]: variant === 'secondary',
                [styles.buttonGhost]: variant === 'ghost',
                [styles.buttonAccentGhost]: variant === 'accentGhost',
                [styles.buttonDanger]: variant === 'danger',
                [styles.iconButton]: variant === 'iconButton',
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
