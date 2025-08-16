import clsx from 'clsx';
import Icon from '../Icons/Icon';
import styles from './style.module.css';

interface RadioItemProps {
    name: 'colorTheme' | 'fontTheme',
    value: string,
    title: string,
    description: string,
    icon: 'sun' | 'moon' | 'sunAndMoon' | 'sansSerif' | 'serif' | 'monospace',
    checked: boolean,
    onChange: (value: string) => void,
}

export default function RadioItem({
    name,
    value,
    title,
    description,
    icon,
    checked,
    onChange,
}: RadioItemProps) {
    return (
        <label className={clsx(styles.radioContainer, {
            [styles.containerChecked]: checked,
        })}
        >
            <div className={styles.iconContainer}>
                <Icon type={icon} />
            </div>
            <div className={styles.text}>
                <span className={styles.title}>{title}</span>
                <p className={styles.description}>{description}</p>
            </div>
            <input
                className={clsx(styles.radioInput, {
                    [styles.inputChecked]: checked,
                })}
                type="radio"
                name={name}
                id={value}
                value={value}
                checked={checked}
                onChange={() => { onChange(value); }}
            />
        </label>
    );
}
