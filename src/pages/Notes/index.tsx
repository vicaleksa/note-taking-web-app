import { Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import NoteCard from '../../components/NoteCard';
import styles from './style.module.css';
import FAB from '../../components/FloatingActionButton';
import Alert from '../../components/Alert';
import getNotesFromStorage from '../../utils/getNotesFromStorage';
import TagsList from './TagsList';

interface NoteProps {
    archived?: boolean,
    tags?: boolean,
}

export default function Notes({ archived, tags }: NoteProps) {
    const storageNotes = getNotesFromStorage();
    const notes = storageNotes.filter((note) => note.isArchived === Boolean(archived));

    const tagSet = new Set<string>();
    storageNotes.forEach((note) => {
        note.tags.forEach((tag) => tagSet.add(tag));
    });
    const notesTags = Array.from(tagSet);

    const getTitle = () => {
        if (archived) {
            return 'Archived Notes';
        }
        if (tags) {
            return 'Tags';
        }
        return 'All Notes';
    };

    const renderContent = () => {
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

        if (tags) {
            return <TagsList tags={notesTags} />;
        }
        if (notes.length > 0) {
            return notesElements;
        }
        return (
            <Alert
                text={archived
                    ? 'No notes have been archived yet. Move notes here for safekeeping, or create a new note.'
                    : 'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.'}
            />
        );
    };

    return (
        <>
            <h1 className={styles.title}>{getTitle()}</h1>
            {archived && (
                <p className={styles.description}>
                    All your archived notes are stored here.
                    You can restore or delete them anytime.
                </p>
            )}
            {renderContent()}
            <FAB
                size="small"
                ariaLabel="Create a new note"
                icon="plus"
            />
        </>
    );
}
