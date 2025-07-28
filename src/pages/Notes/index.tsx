import { Link, useParams } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import NoteCard from '../../components/NoteCard';
import styles from './style.module.css';
import FAB from '../../components/FloatingActionButton';
import Alert from '../../components/Alert';
import getNotesFromStorage from '../../utils/getNotesFromStorage';
import TagsList from '../../components/TagsList';
import BackLink from '../../components/BackLink';
import { Note } from '../../types';

interface NoteProps {
    showArchive?: boolean,
    showTagsOverview?: boolean,
    showNotesByTag?: boolean,
}

export default function Notes({ showArchive, showTagsOverview, showNotesByTag }: NoteProps) {
    const { tagId } = useParams();

    const storageNotes = getNotesFromStorage();

    let notes: Note[] = [];
    if (showNotesByTag && tagId) {
        notes = storageNotes.filter((note) => note.tags.some((tag) => tag.toLowerCase() === tagId.toLowerCase()));
    } else {
        notes = storageNotes.filter((note) => note.isArchived === Boolean(showArchive));
    }

    const tagSet = new Set<string>();
    storageNotes.forEach((note) => {
        note.tags.forEach((tag) => tagSet.add(tag));
    });
    const uniqueTags = Array.from(tagSet);

    const getTitle = () => {
        if (showArchive) {
            return 'Archived Notes';
        }
        if (showTagsOverview) {
            return 'Tags';
        }
        if (showNotesByTag && tagId) {
            return `Notes Tagged: ${tagId}`;
        }
        return 'All Notes';
    };

    const getDescription = () => {
        if (showArchive) {
            return (
                <p className={styles.description}>
                    All your archived notes are stored here. You can restore or delete them anytime.
                </p>
            );
        }
        if (showNotesByTag) {
            return (
                <p className={styles.description}>
                    All notes with the ”
                    {tagId}
                    ” tag are shown here.
                </p>
            );
        }
        return null;
    };

    const renderContent = () => {
        if (showTagsOverview) {
            return <TagsList tags={uniqueTags} />;
        }

        if (notes.length > 0) {
            return notes.map((note) => (
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
        }

        return (
            <Alert
                text={showArchive
                    ? 'No notes have been archived yet. Move notes here for safekeeping, or create a new note.'
                    : 'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.'}
            />
        );
    };

    return (
        <>
            {showNotesByTag && <BackLink />}
            <h1 className={styles.title}>{getTitle()}</h1>
            {getDescription()}
            {renderContent()}
            <FAB
                size="small"
                ariaLabel="Create a new note"
                icon="plus"
            />
        </>
    );
}
