import Icon from '../Icons/Icon';
import styles from './style.module.css';

interface RadioItemProps {
    name: 'themeOptions',
    label: string,
    description: string,
    icon: 'sun' | 'moon' | 'sunAndMoon',
}

export default function RadioItem({
    name,
    label,
    description,
    icon,
}: RadioItemProps) {
    return (
        <div className={styles.radioContainer}>
            <div className={styles.iconContainer}>
                <Icon type={icon} />
            </div>
            <div className={styles.text}>
                <label className={styles.label} htmlFor={label}>{label}</label>
                <p className={styles.description}>{description}</p>
            </div>
            <input type="radio" id={label} name={name} value={label} className={styles.radioInput} />
        </div>
    );
}
