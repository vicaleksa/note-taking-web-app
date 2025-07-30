import styles from './style.module.css';
import IconSearch from '../Icons/IconSearch';

interface SearchProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Search({ onChange }: SearchProps) {
    return (
        <search role="search">
            <form className={styles.searchForm}>
                <IconSearch className={styles.searchIcon} />
                <input
                    onChange={onChange}
                    className={styles.searchInput}
                    type="search"
                    name="search"
                    placeholder="Search by title, content, or tags…"
                />
            </form>
        </search>
    );
}
