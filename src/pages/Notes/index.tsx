import { Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import NoteCard from '../../components/NoteCard';
import styles from './style.module.css';
import FAB from '../../components/FloatingActionButton';
import Alert from '../../components/Alert';
import { Note } from '../../types';

export default function Notes() {
    const notes: Array<Note> = localStorage.getItem('notes') === null
        ? []
        : JSON.parse(localStorage.getItem('notes') as string) as Array<Note>;

    const notesElements = notes.map((note) => (
        <Fragment key={note.id}>
            <Link to={note.id}>
                <NoteCard
                    title={note.title}
                    tags={note.tags}
                    date={note.lastEdited}
                />
            </Link>
            <div className={styles.divider} />
        </Fragment>
    ));

    return (
        <>
            <h1 className={styles.title}>All Notes</h1>
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
