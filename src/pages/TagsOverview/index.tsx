import FloatingActionButton from '../../components/FloatingActionButton';
import TagsList from '../../components/TagsList';
import getNotesFromStorage from '../../utils/getNotesFromStorage';
import styles from './style.module.css';

export default function TagsOverview() {
    const storageNotes = getNotesFromStorage();
    const tagSet = new Set<string>();
    storageNotes.forEach((note) => {
        note.tags.forEach((tag) => tagSet.add(tag));
    });
    const uniqueTags = Array.from(tagSet);

    return (
        <>
            <h1 className={styles.title}>Tags</h1>
            <TagsList tags={uniqueTags} />
            <FloatingActionButton
                size="small"
                ariaLabel="Create a new note"
                icon="plus"
            />
        </>
    );
}
