import BackLink from '../../components/BackLink';
import RadioItem from '../../components/RadioItem';
import { useFont } from '../../contexts/FontContext';
import styles from './style.module.css';

export default function FontTheme() {
    const { font, switchFont } = useFont();

    return (
        <>
            <BackLink text="Settings" />
            <fieldset className={styles.themeOptions}>
                <legend className={styles.title}>Font Theme</legend>
                <p className={styles.description}>Choose your font theme:</p>
                <RadioItem
                    name="fontTheme"
                    title="Sans-serif"
                    value="sansSerif"
                    description="Clean and modern, easy to read"
                    icon="sansSerif"
                    checked={font === 'sansSerif'}
                    onChange={() => { switchFont('sansSerif'); }}
                />
                <RadioItem
                    name="fontTheme"
                    title="Serif"
                    value="serif"
                    description="Classic and elegant for a timeless feel"
                    icon="serif"
                    checked={font === 'serif'}
                    onChange={() => { switchFont('serif'); }}
                />
                <RadioItem
                    name="fontTheme"
                    title="Monospace"
                    value="monospace"
                    description="Code-like, great for a technical vibe"
                    icon="monospace"
                    checked={font === 'monospace'}
                    onChange={() => { switchFont('monospace'); }}
                />
            </fieldset>
        </>
    );
}
