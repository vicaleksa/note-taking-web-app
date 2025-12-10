import { useId, forwardRef } from 'react';
import Icon, { IconType } from '../Icons/Icon';
import styles from './style.module.css';

type InputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'className' | 'id'> & {
    label: string,
    leftIcon?: IconType,
    rightIcon?: IconType,
    errorMessage?: string,
}

function Input(
    {
        label,
        leftIcon,
        rightIcon,
        errorMessage,
        ...inputProps
    }: InputProps,
    ref: React.Ref<HTMLInputElement>,
) {
    const id = useId();

    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <div className={styles.inputField}>
                {leftIcon && <Icon type={leftIcon} className={styles.leftIcon} />}
                <input
                    {...inputProps}
                    ref={ref}
                    className={styles.input}
                    id={id}
                />
                {rightIcon && <Icon type={rightIcon} className={styles.rightIcon} />}
            </div>
            {errorMessage && (
                <div className={styles.hint}>
                    <Icon type="info" className={styles.hintIcon} />
                    <p className={styles.hintText} role="alert">{errorMessage}</p>
                </div>
            )}
        </div>
    );
}

export default forwardRef(Input);
