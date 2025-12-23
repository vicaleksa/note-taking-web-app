import clsx from 'clsx';
import styles from './style.module.css';
import Icon, { IconType } from '../Icons/Icon';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
    variant: 'primary' | 'secondary' | 'ghost' | 'accentGhost' | 'danger' | 'iconButton';
    buttonText?: string;
    leftIcon?: IconType;
}

export default function Button({
    variant, type = 'button', buttonText, leftIcon, disabled, ...buttonProps
}: ButtonProps) {
    return (
        <button
            {...buttonProps}
            // eslint-disable-next-line react/button-has-type
            type={type}
            disabled={disabled}
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
