import { useParams } from 'react-router';
import styles from './style.module.css';
import BackLink from '../../components/BackLink';
import FloatingActionButton from '../../components/FloatingActionButton';
import getNotesFromStorage from '../../utils/getNotesFromStorage';
import NoteList from '../../components/NoteList';

export default function NotesByTag() {
    const { tagId } = useParams();

    const storageNotes = getNotesFromStorage();
    const notes = storageNotes.filter((note) => note.tags.some((tag) => tag.toLowerCase() === tagId?.toLowerCase()));

    return (
        <>
            <BackLink text="Go Back" />
            <h1 className={styles.title}>
                Notes Tagged:
                {' '}
                <span className={styles.tag}>{tagId}</span>
            </h1>
            <p className={styles.description}>
                All notes with the ”
                {tagId}
                ” tag are shown here.
            </p>
            <NoteList notes={notes} />
            <FloatingActionButton
                size="small"
                ariaLabel="Create a new note"
                icon="plus"
            />
        </>
    );
}
