import styles from './style.module.css';
import Icon from '../../assets/images/Icon';

type TextIconProps = {
    name: string;
    title: string;
    placeholder: string;
    leftIcon?: string;
    rightIcon?: string;
    hintIcon: string;
    hintText: string;
}

export default function TextInput({
    name, title, placeholder, leftIcon, rightIcon, hintIcon, hintText,
}: TextIconProps) {
    return (
        <div className={styles.textInput}>
            <label htmlFor={name} className={styles.label}>{title}</label>
            <div className={styles.inputContainer}>
                {leftIcon && <Icon type={leftIcon} className={styles.leftIcon} />}
                <input
                    className={styles.input}
                    type="text"
                    placeholder={placeholder}
                    id={name}
                />
                {rightIcon && <Icon type={rightIcon} className={styles.rightIcon} />}
            </div>
            <div className={styles.hint}>
                <Icon type={hintIcon} className={styles.hintIcon} />
                <p className={styles.hintText}>{hintText}</p>
            </div>
        </div>
    );
}
