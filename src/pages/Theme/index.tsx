import BackLink from '../../components/BackLink';
import Button from '../../components/Button';
import RadioItem from '../../components/RadioItem';
import styles from './style.module.css';

export default function Theme() {
    return (
        <>
            <BackLink text="Settings" />
            <h1 className={styles.title}>Color Theme</h1>
            <p className={styles.description}>Choose your color theme:</p>
            <div className={styles.themeOptions}>
                <RadioItem
                    name="themeOptions"
                    label="Light Mode"
                    description="Pick a clean and classic light theme"
                    icon="sun"
                />
                <RadioItem
                    name="themeOptions"
                    label="Dark Mode"
                    description="Select a sleek and modern dark theme"
                    icon="moon"
                />
                <RadioItem
                    name="themeOptions"
                    label="System"
                    description="Adapts to your device’s theme"
                    icon="sunAndMoon"
                />
            </div>
            <div className={styles.buttonContainer}>
                <Button variant="primary" buttonText="Apply Changes" />
            </div>
        </>
    );
}
