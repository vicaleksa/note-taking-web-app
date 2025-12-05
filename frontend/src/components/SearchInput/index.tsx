import styles from './style.module.css';
import IconSearch from '../Icons/IconSearch';

interface SearchInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({ onChange }: SearchInputProps) {
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
