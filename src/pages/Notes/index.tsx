import { Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import NoteCard from '../../components/NoteCard';
import styles from './style.module.css';
import data from '../../data.json';
import FAB from '../../components/FloatingActionButton';
import Alert from '../../components/Alert';
import { StoredData } from '../../types';

export default function Notes() {
    const notesElements = (data as StoredData).notes.map((note) => (
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
