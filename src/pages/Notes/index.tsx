import { Link } from 'react-router';
import styles from './style.module.css';
import FloatingActionButton from '../../components/FloatingActionButton';
import Alert from '../../components/Alert';
import getNotesFromStorage from '../../utils/getNotesFromStorage';
import NoteList from '../../components/NoteList';
import useBreakpointType from '../../hooks/useBreakpointType';
import Button from '../../components/Button';
import { Note } from '../../types';

interface NotesProps {
    archived?: boolean,
}

export default function Notes({ archived }: NotesProps) {
    const storageNotes = getNotesFromStorage();

    let notes: Note[] = [];
    if (archived) {
        notes = storageNotes.filter((note) => note.isArchived);
    } else {
        notes = storageNotes.filter((note) => !note.isArchived);
    }

    const getTitle = () => {
        if (archived) {
            return 'Archived Notes';
        }
        return 'All Notes';
    };

    const getAlertText = () => {
        if (archived) {
            return 'No notes have been archived yet. Move notes here for safekeeping, or create a new note.';
        }
        return 'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.';
    };

    const breakpointType = useBreakpointType();

    return (
        <div className={styles.notesContainer}>
            <h1 className={styles.notesTitle}>{getTitle()}</h1>
            {breakpointType === 'desktop' && (
                <Link to="/new" className={styles.buttonContainer}>
                    <Button
                        variant="primary"
                        buttonText="New note"
                    />
                </Link>
            )}
            {archived && (
                <p className={styles.description}>
                    All your archived notes are stored here. You can restore or delete them anytime.
                </p>
            )}
            <div className={styles.noteList}>
                <NoteList notes={notes} archived={archived} />
            </div>
            {notes.length === 0 && (
                <Alert text={getAlertText()} />
            )}
            {breakpointType === 'mobile' && (
                <FloatingActionButton
                    ariaLabel="Create a new note"
                    icon="plus"
                />
            )}
        </div>
    );
}
