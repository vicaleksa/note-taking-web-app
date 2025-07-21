import { Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import NoteCard from '../../components/NoteCard';
import styles from './style.module.css';
import FAB from '../../components/FloatingActionButton';
import Alert from '../../components/Alert';
import getNotesFromStorage from '../../utils/getNotesFromStorage';

interface NoteProps {
    archived?: boolean;
}

export default function Notes({ archived }: NoteProps) {
    const storageNotes = getNotesFromStorage();
    const notArchivedNotes = storageNotes.filter((note) => !note.isArchived);
    const archivedNotes = storageNotes.filter((note) => note.isArchived);
    const notes = archived ? archivedNotes : notArchivedNotes;

    const notesElements = notes.map((note) => (
        <Fragment key={note.id}>
            <Link to={note.id}>
                <NoteCard
                    title={note.title || 'Untitled Note'}
                    tags={note.tags}
                    date={note.lastEdited}
                />
            </Link>
            <div className={styles.divider} />
        </Fragment>
    ));

    return (
        <>
            <h1 className={styles.title}>{archived ? 'Archived Notes' : 'All Notes'}</h1>
            {archived && (
                <p className={styles.description}>
                    All your archived notes are stored here.
                    You can restore or delete them anytime.
                </p>
            )}
            {notesElements.length > 0
                ? notesElements
                : (
                    <Alert
                        text="You don’t have any notes yet. Start a new note to capture your thoughts and ideas."
                    />
                )}
            <FAB
                size="small"
                ariaLabel="Create a new note"
                icon="plus"
            />
        </>
    );
}
