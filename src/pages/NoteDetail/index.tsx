import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import IconClock from '../../components/Icons/IconClock';
import IconTag from '../../components/Icons/IconTag';
import styles from './style.module.css';
import data from '../../data.json';
import formatDate from '../../utils/formatDate';
import NoteActions from './NoteActions';

interface NoteDetailProps {
    create?: boolean,
}

interface DefaultFormDataType {
    title: string,
    tags: string,
    content: string,
    lastEdited: null | string,
}

const defaultFormData = {
    title: '',
    tags: '',
    content: '',
    lastEdited: null,
};

export default function NoteDetail({ create }: NoteDetailProps) {
    const { id } = useParams();
    const [notFound, setNotFound] = useState(false);
    const [formState, setFormState] = useState<DefaultFormDataType>(defaultFormData);
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const tagsRef = useRef<HTMLTextAreaElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const el = titleRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${String(el.scrollHeight)}px`;
        }
    }, [formState.title]);

    useEffect(() => {
        const el = tagsRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${String(el.scrollHeight)}px`;
        }
    }, [formState.tags]);

    useEffect(() => {
        const el = textRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${String(el.scrollHeight)}px`;
        }
    }, [formState.content]);

    useEffect(() => {
        if (!create && id) {
            const foundNote = data.notes.find((noteItem) => noteItem.id === id);
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
        return <p>Note is not found</p>;
    }

    return (
        <>
            <NoteActions />
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
