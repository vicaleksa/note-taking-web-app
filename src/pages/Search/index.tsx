import { useState } from 'react';
import FAB from '../../components/FloatingActionButton';
import SearchInput from '../../components/SearchInput';
import styles from './style.module.css';
import NoteList from '../../components/NoteList';
import getNotesFromStorage from '../../utils/getNotesFromStorage';
import Alert from '../../components/Alert';
import { Note } from '../../types';

export default function Search() {
    const [searchFilter, setSearchFilter] = useState('');

    const storageNotes = getNotesFromStorage();
    let notes: Note[] = [];
    if (searchFilter) {
        notes = storageNotes.filter((note) => {
            if (note.title.toLowerCase().includes(searchFilter.toLowerCase())) {
                return true;
            }
            if (note.tags.some((tag) => tag.toLowerCase().includes(searchFilter.toLowerCase()))) {
                return true;
            }
            if (note.content.toLowerCase().includes(searchFilter.toLowerCase())) {
                return true;
            }
            return false;
        });
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchFilter(value);
    };

    return (
        <>
            <h1 className={styles.title}>Search</h1>
            <SearchInput onChange={handleChange} />
            {searchFilter && (
                <p className={styles.description}>
                    All notes matching ”
                    {searchFilter}
                    ” are displayed below.
                </p>
            )}
            <NoteList notes={notes} />
            {notes.length === 0 && searchFilter && (
                <Alert text="No notes match your search. Try a different keyword or create a new note." />
            )}
            <FAB
                size="small"
                ariaLabel="Create a new note"
                icon="plus"
            />
        </>
    );
}
