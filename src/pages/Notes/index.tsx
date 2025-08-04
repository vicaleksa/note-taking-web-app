import { Link, useLocation, useParams } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import NoteCard from '../../components/NoteCard';
import styles from './style.module.css';
import FloatingActionButton from '../../components/FloatingActionButton';
import Alert from '../../components/Alert';
import getNotesFromStorage from '../../utils/getNotesFromStorage';
import TagsList from '../../components/TagsList';
import BackLink from '../../components/BackLink';
import { Note } from '../../types';
import Search from '../../components/SearchInput';

interface NoteProps {
    showSearch?: boolean,
    showArchive?: boolean,
    showTagsOverview?: boolean,
    showNotesByTag?: boolean,
}

export default function Notes({
    showSearch,
    showArchive,
    showTagsOverview,
    showNotesByTag,
}: NoteProps) {
    const { tagId } = useParams();
    const location = useLocation();
    const [searchFilter, setSearchFilter] = useState('');

    const storageNotes = getNotesFromStorage();

    let notes: Note[] = [];
    if (showNotesByTag && tagId) {
        notes = storageNotes.filter((note) => note.tags.some((tag) => tag.toLowerCase() === tagId.toLowerCase()));
    } else if (showSearch) {
        notes = storageNotes.filter((note) => {
            if (note.title.toLowerCase().includes(searchFilter.toLowerCase())) {
                return true;
            }
            if (note.tags.some((tag) => tag.toLowerCase().includes(searchFilter.toLowerCase()))) {
                return true;
            }
            if (note.content.toLowerCase().includes(searchFilter.toLowerCase())) {
                return true;
            }
            return false;
        });
    } else {
        notes = storageNotes.filter((note) => note.isArchived === Boolean(showArchive));
    }

    const tagSet = new Set<string>();
    storageNotes.forEach((note) => {
        note.tags.forEach((tag) => tagSet.add(tag));
    });
    const uniqueTags = Array.from(tagSet);

    const getTitle = () => {
        if (showSearch) {
            return 'Search';
        }
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
        if (searchFilter && showSearch) {
            return (
                <p className={styles.description}>
                    All notes matching ”
                    {searchFilter}
                    ” are displayed below.
                </p>
            );
        }
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

        let alertText;
        if (showSearch) {
            alertText = 'No notes match your search. Try a different keyword or create a new note.';
        } else if (showArchive) {
            alertText = 'No notes have been archived yet. Move notes here for safekeeping, or create a new note.';
        } else {
            alertText = 'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.';
        }

        return (
            <Alert text={alertText} />
        );
    };

    useEffect(() => {
        setSearchFilter('');
    }, [location.pathname]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchFilter(value);
    };

    return (
        <>
            {showNotesByTag && <BackLink />}
            <h1 className={styles.title}>{getTitle()}</h1>
            {showSearch && <Search onChange={handleChange} />}
            {getDescription()}
            {renderContent()}
            <FloatingActionButton
                size="small"
                ariaLabel="Create a new note"
                icon="plus"
            />
        </>
    );
}
