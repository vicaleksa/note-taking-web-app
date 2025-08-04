import Alert from '../../components/Alert';
import FloatingActionButton from '../../components/FloatingActionButton';
import NoteList from '../../components/NoteList';
import getNotesFromStorage from '../../utils/getNotesFromStorage';
import styles from './style.module.css';

export default function Archive() {
    const storageNotes = getNotesFromStorage();
    const notes = storageNotes.filter((note) => note.isArchived);

    return (
        <>
            <h1 className={styles.title}>Archived Notes</h1>
            <p className={styles.description}>
                All your archived notes are stored here. You can restore or delete them anytime.
            </p>
            <NoteList notes={notes} />
            {notes.length === 0 && (
                <Alert text="No notes have been archived yet. Move notes here for safekeeping, or create a new note." />
            )}
            <FloatingActionButton
                size="small"
                ariaLabel="Create a new note"
                icon="plus"
            />
        </>
    );
}
