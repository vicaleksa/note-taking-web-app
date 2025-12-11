import { useParams } from 'react-router';
import styles from './style.module.css';
import LinkButton from '../../components/LinkButton';
import FloatingActionButton from '../../components/FloatingActionButton';
import getNotesFromStorage from '../../utils/getNotesFromStorage';
import NoteList from '../../components/NoteList';
import useBreakpointType from '../../hooks/useBreakpointType';
import IconArrowLeft from '../../components/Icons/IconArrowLeft';

export default function NotesByTag() {
    const { tagId } = useParams();

    const storageNotes = getNotesFromStorage();
    const notes = storageNotes.filter((note) => note.tags.some((tag) => tag.toLowerCase() === tagId?.toLowerCase()));

    const breakpointType = useBreakpointType();

    return (
        <>
            {breakpointType === 'mobile' && (
                <LinkButton href=".." variant="primary">
                    <IconArrowLeft className={styles.backIcon} />
                    Go Back
                </LinkButton>
            )}
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
            {breakpointType === 'mobile' && (
                <FloatingActionButton
                    ariaLabel="Create a new note"
                    icon="plus"
                />
            )}
        </>
    );
}
