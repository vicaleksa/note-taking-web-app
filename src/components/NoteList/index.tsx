import { Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import NoteCard from '../NoteCard';
import styles from './style.module.css';
import { Note } from '../../types';

interface NoteListProps {
    notes: Note[],
}

export default function NoteList({ notes }: NoteListProps) {
    const noteListElement = notes.map((note) => (
        <Fragment key={note.id}>
            <Link to={note.id}>
                <NoteCard
                    title={note.title || 'Untitled Note'}
                    tags={note.tags}
                    date={note.lastEdited}
                />
            </Link>
            <div className={styles.divider} aria-hidden="true" />
        </Fragment>
    ));

    return noteListElement;
}
