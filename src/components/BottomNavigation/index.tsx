import styles from './style.module.css';
import NavigationLink from './NavigationLink';

export default function BottomNavigation() {
    return (
        <div className={styles.navbar}>
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
        </div>
    );
}
