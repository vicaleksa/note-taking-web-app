import styles from './style.module.css';
import FloatingActionButton from '../../components/FloatingActionButton';
import Alert from '../../components/Alert';
import getNotesFromStorage from '../../utils/getNotesFromStorage';
import NoteList from '../../components/NoteList';
import useBreakpointType from '../../hooks/useBreakpointType';

export default function Notes() {
    const storageNotes = getNotesFromStorage();
    const notes = storageNotes.filter((note) => !note.isArchived);

    const breakpointType = useBreakpointType();

    return (
        <>
            <h1 className={styles.notesTitle}>All Notes</h1>
            <NoteList notes={notes} />
            {notes.length === 0 && (
                <Alert text="You don’t have any notes yet. Start a new note to capture your thoughts and ideas." />
            )}
            {breakpointType === 'mobile' && (
                <FloatingActionButton
                    ariaLabel="Create a new note"
                    icon="plus"
                />
            )}
        </>
    );
}
