import { NavLink, UIMatch, useMatches } from 'react-router';
import styles from './style.module.css';
import IconLogo from '../Icons/IconLogo';
import useBreakpointType from '../../hooks/useBreakpointType';
// import SearchInput from '../SearchInput';
import IconSettings from '../Icons/IconSettings';

interface Handle {
    title?: string;
}

export default function PageHeader() {
    const breakpointType = useBreakpointType();

    const matches = useMatches() as UIMatch<unknown, Handle>[];
    const title = matches[matches.length - 1]?.handle?.title;

    return (
        <header className={styles.header}>
            {
                breakpointType === 'mobile' && (
                    <NavLink to="/" aria-label="Go to all notes">
                        <IconLogo />
                    </NavLink>
                )
            }
            {
                breakpointType === 'desktop' && (
                    <div className={styles.topBar}>
                        <h1 className={styles.title}>{title}</h1>
                        {/* <SearchInput /> */}
                        <NavLink
                            to="settings"
                            aria-label="Go to settings"
                            className={styles.settings}
                        >
                            <IconSettings />
                        </NavLink>
                    </div>
                )
            }
        </header>
    );
}
