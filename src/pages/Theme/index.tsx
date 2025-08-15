import BackLink from '../../components/BackLink';
import RadioItem from '../../components/RadioItem';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './style.module.css';

export default function Theme() {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <BackLink text="Settings" />
            <fieldset className={styles.themeOptions}>
                <legend className={styles.title}>Color Theme</legend>
                <p className={styles.description}>Choose your color theme:</p>
                <RadioItem
                    name="colorTheme"
                    title="Light Mode"
                    value="light"
                    description="Pick a clean and classic light theme"
                    icon="sun"
                    checked={theme === 'light'}
                    onChange={toggleTheme}
                />
                <RadioItem
                    name="colorTheme"
                    title="Dark Mode"
                    value="dark"
                    description="Select a sleek and modern dark theme"
                    icon="moon"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                />
                <RadioItem
                    name="colorTheme"
                    title="System"
                    value="system"
                    description="Adapts to your device’s theme"
                    icon="sunAndMoon"
                    checked={theme === 'system'}
                    onChange={toggleTheme}
                />
            </fieldset>
        </>
    );
}
