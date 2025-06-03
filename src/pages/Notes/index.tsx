import NoteCard from '../../components/NoteCard';
import styles from './style.module.css';
import data from '../../data.json';

export default function Notes() {
    const notesElements = data.notes.map((note) => (
        <NoteCard
            key={note.title}
            title={note.title}
            tags={note.tags}
            date={note.lastEdited}
        />
    ));
    return (
        <>
            <h1 className={styles.title}>All Notes</h1>
            {notesElements}
        </>
    );
}
