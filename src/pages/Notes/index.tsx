import { Link } from 'react-router';
import NoteCard from '../../components/NoteCard';
import styles from './style.module.css';
import data from '../../data.json';
import FAB from '../../components/FloatingActionButton';

export default function Notes() {
    const notesElements = data.notes.map((note) => (
        <>
            <Link
                key={note.id}
                to={note.id}
            >
                <NoteCard
                    title={note.title}
                    tags={note.tags}
                    date={note.lastEdited}
                />
            </Link>
            <div className={styles.divider} />
        </>
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
