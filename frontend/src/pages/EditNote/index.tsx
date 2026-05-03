import { useNavigate, useParams } from 'react-router';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import IconClock from '../../components/Icons/IconClock';
import IconTag from '../../components/Icons/IconTag';
import styles from './style.module.css';
import formatDate from '../../utils/formatDate';
import NoteActions from '../../components/NoteActions';
import formatTags from '../../utils/formatTags';
import Modal from '../../components/Modal';
import IconLoading from '../../components/Icons/IconLoading';
import Toast from '../../components/Toast';
import getNoteItem from '../../api/getNoteItem';
import { FormDataType } from '../../types';
import updateNote from '../../api/updateNote';
import deleteNote from '../../api/deleteNote';
import archiveNote from '../../api/archiveNote';

interface NoteDetailProps {
    archived?: boolean,
}

export default function EditNote({ archived }: NoteDetailProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenArchiveModal, setIsOpenArchiveModal] = useState(false);
    const [isOpenArchiveToast, setIsOpenArchiveToast] = useState(false);
    const [isOpenUnarchiveToast, setIsOpenUnarchiveToast] = useState(false);
    // const titleRef = useRef<HTMLTextAreaElement>(null);
    // const tagsRef = useRef<HTMLTextAreaElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);

    if (!id) {
        throw new Error('ID is undefined');
    }

    const {
        isPending, isError, data, error,
    } = useQuery({
        queryKey: ['note', id],
        queryFn: () => getNoteItem(id),
    });

    const { register, handleSubmit, reset } = useForm<FormDataType>({
        defaultValues: {
            title: '',
            tags: '',
            content: '',
        },
    });

    useEffect(() => {
        if (!data) {
            return;
        }

        reset({
            title: data.title,
            tags: formatTags(data.tags.map((tag) => tag.name)),
            content: data.content,
        });
    }, [data, reset, id]);

    const updateNoteMutation = useMutation({
        mutationFn: updateNote,
    });

    const onSubmit = (submitData: FormDataType) => {
        updateNoteMutation.mutate({ id, submitData });
    };

    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            navigate('/');
        },
    });

    const onDelete = () => {
        deleteNoteMutation.mutate(id);
    };

    const archiveNoteMutation = useMutation({
        mutationFn: archiveNote,
        onSuccess: () => {
            navigate('/archive');
        },
    });

    const onArchive = () => {
        archiveNoteMutation.mutate(id);
    };

    useEffect(() => {
        const el = textRef.current;
        if (el) {
            el.focus();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useTextareaResize(titleRef, formState.title);
    // useTextareaResize(tagsRef, formState.tags);
    // useTextareaResize(textRef, formState.content);

    const handleEnterDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
        }
    };

    if (isPending) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return (
            <span>
                {' '}
                Error:
                {error.message}
            </span>
        );
    }

    return (
        <>
            <div className={styles.actions}>
                <NoteActions
                    onSave={handleSubmit(onSubmit)}
                    onDelete={() => { setIsOpenDeleteModal(true); }}
                    onArchive={() => {
                        if (!archived) {
                            setIsOpenUnarchiveToast(false);
                            setIsOpenArchiveModal(true);
                        } else {
                            setIsOpenArchiveToast(false);
                            // unarchiveNote();
                        }
                    }}
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
                    onAction={onDelete}
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
                        onAction={onArchive}
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
                    {...register('title')}
                    onKeyDown={handleEnterDown}
                    rows={1}
                    id="title"
                    className={clsx(styles.title, styles.textarea)}
                    placeholder="Enter a title…"
                />
                <div className={styles.property}>
                    <IconTag className={styles.propertyIcon} />
                    <label className={styles.propertyName} htmlFor="tags">Tags</label>
                    <textarea
                        {...register('tags')}
                        id="tags"
                        rows={1}
                        className={clsx(styles.tags, styles.textarea)}
                        placeholder="Add tags separated by commas (e.g. Work, Planning)"
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
                    <time>{formatDate(data.lastEdited)}</time>
                </div>
                <textarea
                    {...register('content')}
                    className={clsx(styles.text, styles.textarea)}
                    placeholder="Start typing your note here…"
                />
            </div>
        </>
    );
}
