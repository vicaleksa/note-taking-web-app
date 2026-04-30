import { useNavigate } from 'react-router';
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import IconClock from '../../components/Icons/IconClock';
import IconTag from '../../components/Icons/IconTag';
import styles from './style.module.css';
import NoteActions from '../../components/NoteActions';
import saveNote from '../../api/saveNote';
import { FormDataType } from '../../types';

export default function CreateNote() {
    const navigate = useNavigate();
    // const titleRef = useRef<HTMLTextAreaElement>(null);
    // const tagsRef = useRef<HTMLTextAreaElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const { register, handleSubmit } = useForm<FormDataType>();

    const mutation = useMutation({
        mutationFn: saveNote,
        onSuccess: () => {
            navigate('/');
        },
    });

    const onSubmit = (submitData: FormDataType) => {
        mutation.mutate(submitData);
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

    return (
        <>
            <div className={styles.actions}>
                <NoteActions
                    onSave={handleSubmit(onSubmit)}
                    create
                />
            </div>
            <div className={styles.note}>
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
                    <IconClock className={styles.propertyIcon} />
                    <div className={styles.propertyName}>Last edited</div>
                    <time>Not yet saved</time>
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
