import { NavLink, useLocation } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import clsx from 'clsx';
import NoteCard from '../NoteCard';
import styles from './style.module.css';
import { Note } from '../../types';

interface NoteListProps {
    notes: Note[],
    archived?: boolean,
    tags?: boolean,
    tagId?: string,
}

const getNavClassName = ({ isActive }: { isActive: boolean }) => clsx(
    styles.noteCard,
    { [styles.noteCardActive]: isActive },
);

export default function NoteList({
    notes,
    archived,
    tags,
    tagId = '',
}: NoteListProps) {
    const location = useLocation();

    let path = '/';
    if (archived) {
        path = '/archive/';
    }
    if (tags) {
        path = `/tags/${tagId}/`;
    }

    const noteListElement = notes.map((note) => (
        <Fragment key={note.id}>
            <NavLink
                to={`${path}${note.id}`}
                className={getNavClassName}
                aria-label={
                    `Open ${archived ? '/archive/' : ''}note '${note.title || 'Untitled'}',
                    last edited on ${note.lastEdited}`
                }
            >
                <NoteCard
                    title={note.title || 'Untitled Note'}
                    tags={note.tags}
                    date={note.lastEdited}
                />
            </NavLink>
        </Fragment>
    ));

    return (
        <>
            {location.pathname === '/new' && (
                <>
                    <div className={styles.newNoteCard}>
                        Untitled Note
                    </div>
                    <div className={styles.divider} aria-hidden="true" />
                </>
            )}
            {noteListElement}
        </>
    );
}
