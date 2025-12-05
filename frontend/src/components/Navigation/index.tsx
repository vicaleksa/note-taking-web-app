import { NavLink } from 'react-router';
import styles from './style.module.css';
import NavigationLink from './NavigationLink';
import IconLogo from '../Icons/IconLogo';
import TagsOverview from '../../pages/TagsOverview';
import useBreakpointType from '../../hooks/useBreakpointType';

export default function Navigation() {
    const breakpointType = useBreakpointType();

    return (
        <>
            {breakpointType === 'mobile' && (
                <ul className={styles.bottomNavbar}>
                    <NavigationLink
                        link="/"
                        icon="home"
                        text="Home"
                    />
                    <NavigationLink
                        link="/search"
                        icon="search"
                        text="Search"
                    />
                    <NavigationLink
                        link="/archive"
                        icon="archive"
                        text="Archived"
                    />
                    <NavigationLink
                        link="/tags"
                        icon="tag"
                        text="Tags"
                    />
                    <NavigationLink
                        link="/settings"
                        icon="settings"
                        text="Settings"
                    />
                </ul>
            )}
            {breakpointType === 'desktop' && (
                <>
                    <NavLink
                        to="/"
                        className={styles.logoContainer}
                        aria-label="Go to all notes"
                    >
                        <IconLogo />
                    </NavLink>
                    <ul>
                        <NavigationLink
                            link="/"
                            icon="home"
                            text="All Notes"
                        />
                        <NavigationLink
                            link="/archive"
                            icon="archive"
                            text="Archived Notes"
                        />
                    </ul>
                    <div className={styles.divider} aria-hidden="true" />
                    <TagsOverview />
                </>
            )}
        </>
    );
}
