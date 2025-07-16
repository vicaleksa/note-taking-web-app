import { useNavigate, useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import IconClock from '../../components/Icons/IconClock';
import IconTag from '../../components/Icons/IconTag';
import styles from './style.module.css';
import formatDate from '../../utils/formatDate';
import NoteActions from './NoteActions';
import { Note } from '../../types';
import useTextareaResize from '../../hooks/useTextareaResize';

interface NoteDetailProps {
    create?: boolean,
}

interface FormDataType {
    title: string,
    tags: string,
    content: string,
    lastEdited: null | string,
}

const defaultFormData: FormDataType = {
    title: '',
    tags: '',
    content: '',
    lastEdited: null,
};

export default function NoteDetail({ create }: NoteDetailProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notFound, setNotFound] = useState(false);
    const [formState, setFormState] = useState<FormDataType>(defaultFormData);
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const tagsRef = useRef<HTMLTextAreaElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);

    const saveNote = () => {
        const newNote = {
            ...formState,
            lastEdited: new Date().toISOString(),
        };
        setFormState(newNote);

        const notes: Array<Note> = localStorage.getItem('notes') === null
            ? []
            : JSON.parse(localStorage.getItem('notes') as string) as Array<Note>;

        if (create) {
            const noteId = uuidv4();
            notes.push({
                ...newNote,
                id: noteId,
                tags: newNote.tags.split(', '),
            });
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            navigate(`/${noteId}`);
        } else {
            const noteIndex = notes.findIndex((note) => note.id === id);
            if (!id) {
                console.error('id is undefined');
                return;
            }
            if (noteIndex === -1) {
                notes.push({
                    ...newNote,
                    id,
                    tags: newNote.tags.split(', '),
                });
            } else {
                notes[noteIndex] = {
                    ...newNote,
                    id,
                    tags: newNote.tags.split(', '),
                };
            }
        }

        localStorage.setItem('notes', JSON.stringify(notes));
    };

    useEffect(() => {
        const el = textRef.current;
        if (el && create) {
            el.focus();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useTextareaResize(titleRef, formState.title);
    useTextareaResize(tagsRef, formState.tags);
    useTextareaResize(textRef, formState.content);

    useEffect(() => {
        if (!create && id) {
            const notes: Array<Note> = localStorage.getItem('notes') === null
                ? []
                : JSON.parse(localStorage.getItem('notes') as string) as Array<Note>;
            const foundNote = notes.find((noteItem) => noteItem.id === id);
            if (foundNote) {
                const newNote = {
                    ...foundNote,
                    tags: foundNote.tags.join(', '),
                };
                setFormState(newNote);
            } else {
                setNotFound(true);
            }
        }
    }, [create, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEnterDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
        }
    };

    if (notFound) {
        return <p>Note not found 😕</p>;
    }

    return (
        <>
            <NoteActions onSave={saveNote} />
            <textarea
                ref={titleRef}
                value={formState.title}
                onChange={handleChange}
                onKeyDown={handleEnterDown}
                rows={1}
                name="title"
                id="title"
                className={clsx(styles.title, styles.textarea)}
                placeholder="Enter a title…"
            />
            <div className={styles.property}>
                <IconTag className={styles.propertyIcon} />
                <label className={styles.propertyName} htmlFor="tags">Tags</label>
                <textarea
                    ref={tagsRef}
                    name="tags"
                    id="tags"
                    rows={1}
                    value={formState.tags}
                    className={clsx(styles.tags, styles.textarea)}
                    placeholder="Add tags separated by commas (e.g. Work, Planning)"
                    onChange={handleChange}
                    onKeyDown={handleEnterDown}
                />

                <IconClock className={styles.propertyIcon} />
                <div className={styles.propertyName}>Last edited</div>
                <time>{formState.lastEdited ? formatDate(formState.lastEdited) : 'Not yet saved'}</time>
            </div>
            <textarea
                ref={textRef}
                name="content"
                className={clsx(styles.text, styles.textarea)}
                value={formState.content}
                placeholder="Start typing your note here…"
                onChange={handleChange}
            />
        </>
    );
}
