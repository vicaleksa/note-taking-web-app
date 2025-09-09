import { useEffect, useRef, useState } from 'react';
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
        <div className={styles.navbar}>
            {navigationType === 'bottom' && (
                <>
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
                </>
            )}
            {navigationType === 'side' && (
                <>
                    <div className={styles.logoContainer}>
                        <IconLogo />
                    </div>
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
                    <div className={styles.divider} />
                    <TagsOverview />
                </>
            )}
        </div>
    );
}
