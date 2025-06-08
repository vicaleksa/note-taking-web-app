import { Fragment } from 'react';
import NoteCard from '../../components/NoteCard';
import styles from './style.module.css';
import data from '../../data.json';
import FAB from '../../components/FloatingActionButton';

export default function Notes() {
    const notesElements = data.notes.map((note) => (
        <Fragment key={note.title}>
            <NoteCard
                title={note.title}
                tags={note.tags}
                date={note.lastEdited}
            />
            <div className={styles.divider} />
        </Fragment>
    ));
    return (
        <>
            <h1 className={styles.title}>All Notes</h1>
            {notesElements}
            <FAB
                size="small"
                ariaLabel="Create a new note"
                icon="plus"
            />
        </>
    );
}
