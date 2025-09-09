import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import styles from './style.module.css';
import NavigationLink from './NavigationLink';
import IconLogo from '../Icons/IconLogo';
import TagsOverview from '../../pages/TagsOverview';

type NavigationType = 'bottom' | 'side';

export default function Navigation() {
    const largeScreenMediaQuery = window.matchMedia('(width >= 64rem)');
    const sizeMediaQueryRef = useRef(largeScreenMediaQuery);
    const [navigationType, setNavigationType] = useState<NavigationType>(
        sizeMediaQueryRef.current.matches ? 'side' : 'bottom',
    );

    useEffect(() => {
        const sizeMediaQuery = sizeMediaQueryRef.current;
        const handleNavigationElementChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                setNavigationType('side');
            } else {
                setNavigationType('bottom');
            }
        };

        sizeMediaQuery.addEventListener('change', handleNavigationElementChange);

        return () => {
            sizeMediaQuery.removeEventListener('change', handleNavigationElementChange);
        };
    }, []);

    return (
        <>
            {navigationType === 'bottom' && (
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
            {navigationType === 'side' && (
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
