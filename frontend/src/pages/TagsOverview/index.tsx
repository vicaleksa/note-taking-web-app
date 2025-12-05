import Alert from '../../components/Alert';
import FloatingActionButton from '../../components/FloatingActionButton';
import TagsList from '../../components/TagsList';
import useBreakpointType from '../../hooks/useBreakpointType';
import getNotesFromStorage from '../../utils/getNotesFromStorage';
import styles from './style.module.css';

export default function TagsOverview() {
    const storageNotes = getNotesFromStorage();
    const tagSet = new Set<string>();
    storageNotes.forEach((note) => {
        note.tags.forEach((tag) => tagSet.add(tag));
    });
    const uniqueTags = Array.from(tagSet);

    const breakpointType = useBreakpointType();

    return (
        <>
            <h1 className={styles.title}>Tags</h1>
            <div className={styles.tagList}>
                <TagsList tags={uniqueTags} />
            </div>
            {uniqueTags.length === 0 && (
                <Alert text="You don’t have any tags yet. Add tags to your notes to make them easier to find." />
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
