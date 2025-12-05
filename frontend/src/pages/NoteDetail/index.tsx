import { useNavigate, useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import IconClock from '../../components/Icons/IconClock';
import IconTag from '../../components/Icons/IconTag';
import styles from './style.module.css';
import formatDate from '../../utils/formatDate';
import NoteActions from '../../components/NoteActions';
import useTextareaResize from '../../hooks/useTextareaResize';
import parseTags from '../../utils/parseTags';
import formatTags from '../../utils/formatTags';
import Modal from '../../components/Modal';
import getNotesFromStorage from '../../utils/getNotesFromStorage';
import IconLoading from '../../components/Icons/IconLoading';
import Toast from '../../components/Toast';

interface NoteDetailProps {
    create?: boolean,
    archived?: boolean,
}

interface FormDataType {
    title: string,
    tags: string,
    content: string,
    lastEdited: null | string,
    isArchived: boolean,
}

const defaultFormData: FormDataType = {
    title: '',
    tags: '',
    content: '',
    lastEdited: null,
    isArchived: false,
};

export default function NoteDetail({ create = false, archived }: NoteDetailProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notFound, setNotFound] = useState(false);
    const [formState, setFormState] = useState<FormDataType>(defaultFormData);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenArchiveModal, setIsOpenArchiveModal] = useState(false);
    const [isOpenArchiveToast, setIsOpenArchiveToast] = useState(false);
    const [isOpenUnarchiveToast, setIsOpenUnarchiveToast] = useState(false);
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const tagsRef = useRef<HTMLTextAreaElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);

    const saveNote = () => {
        const newNote = {
            ...formState,
            lastEdited: new Date().toISOString(),
        };
        setFormState(newNote);

        const notes = getNotesFromStorage();

        if (create) {
            const noteId = uuidv4();
            notes.push({
                ...newNote,
                id: noteId,
                tags: parseTags(newNote.tags),
            });
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
                    tags: parseTags(newNote.tags),
                });
            } else {
                notes[noteIndex] = {
                    ...newNote,
                    id,
                    tags: parseTags(newNote.tags),
                };
            }
        }

        localStorage.setItem('notes', JSON.stringify(notes));
    };

    const deleteNote = () => {
        const notes = getNotesFromStorage();
        const noteIndex = notes.findIndex((note) => note.id === id);
        notes.splice(noteIndex, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        setIsOpenDeleteModal(false);
        navigate('/');
    };

    const archiveNote = () => {
        const notes = getNotesFromStorage();
        const noteIndex = notes.findIndex((note) => note.id === id);
        notes[noteIndex].isArchived = true;
        localStorage.setItem('notes', JSON.stringify(notes));
        setIsOpenArchiveModal(false);
        if (!id) {
            console.error('id is undefined');
            return;
        }
        navigate(`/archive/${id}`);
        setIsOpenArchiveToast(true);
    };

    const unarchiveNote = () => {
        const notes = getNotesFromStorage();
        const noteIndex = notes.findIndex((note) => note.id === id);
        notes[noteIndex].isArchived = false;
        localStorage.setItem('notes', JSON.stringify(notes));
        if (!id) {
            console.error('id is undefined');
            return;
        }
        navigate(`/${id}`);
        setIsOpenUnarchiveToast(true);
    };

    useEffect(() => {
        const el = textRef.current;
        if (el) {
            el.focus();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useTextareaResize(titleRef, formState.title);
    useTextareaResize(tagsRef, formState.tags);
    useTextareaResize(textRef, formState.content);

    useEffect(() => {
        if (!create && id) {
            const notes = getNotesFromStorage();

            const foundNote = notes.find((noteItem) => noteItem.id === id);
            if (foundNote) {
                const newNote = {
                    ...foundNote,
                    tags: formatTags(foundNote.tags),
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
            <div className={styles.actions}>
                <NoteActions
                    onSave={saveNote}
                    onDelete={() => { setIsOpenDeleteModal(true); }}
                    onArchive={() => {
                        if (!archived) {
                            setIsOpenUnarchiveToast(false);
                            setIsOpenArchiveModal(true);
                        } else {
                            setIsOpenArchiveToast(false);
                            unarchiveNote();
                        }
                    }}
                    create={create}
                    archived={archived}
                />
            </div>
            <div className={styles.note}>
                <Modal
                    type="delete"
                    icon="delete"
                    title="Delete Note"
                    text="Are you sure you want to permanently delete this note? This action cannot be undone."
                    open={isOpenDeleteModal}
                    onClose={() => { setIsOpenDeleteModal(false); }}
                    onAction={deleteNote}
                    actionContent="Delete Note"
                />
                {!archived && (
                    <Modal
                        type="archive"
                        icon="archive"
                        title="Archive Note"
                        text="Are you sure you want to archive this note?
                        You can find it in the Archived Notes section and restore it anytime."
                        open={isOpenArchiveModal}
                        onClose={() => { setIsOpenArchiveModal(false); }}
                        onAction={archiveNote}
                        actionContent="Archive Note"
                    />
                )}
                {isOpenArchiveToast && (
                    <Toast
                        icon="checkmark"
                        text="Note archived."
                        link="/archive"
                        linkText="Archived Notes"
                        onClose={() => { setIsOpenArchiveToast(false); }}
                    />
                )}
                {isOpenUnarchiveToast && (
                    <Toast
                        icon="checkmark"
                        text="Note restored to active notes."
                        link="/"
                        linkText="All Notes"
                        onClose={() => { setIsOpenUnarchiveToast(false); }}
                    />
                )}
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

                    {archived && (
                        <>
                            <IconLoading className={styles.propertyIcon} />
                            <div className={styles.propertyName}>Status</div>
                            <div className={styles.propertyName}>Archived</div>
                        </>
                    )}

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
            </div>
        </>
    );
}
