import { NavLink, useLocation } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import clsx from 'clsx';
import NoteCard from '../NoteCard';
import styles from './style.module.css';
import { Note } from '../../types';

interface NoteListProps {
    notes: Note[],
    archived?: boolean,
}

const getNavClassName = ({ isActive }: { isActive: boolean }) => clsx(
    styles.noteCard,
    { [styles.noteCardActive]: isActive },
);

export default function NoteList({ notes, archived }: NoteListProps) {
    const location = useLocation();

    const noteListElement = notes.map((note) => (
        <Fragment key={note.id}>
            <NavLink to={`${archived ? '/archive/' : '/'}${note.id}`} className={getNavClassName}>
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
