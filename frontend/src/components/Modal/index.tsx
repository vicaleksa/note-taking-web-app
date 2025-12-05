import { useEffect, useRef } from 'react';
import Button from '../Button';
import Icon, { IconType } from '../Icons/Icon';
import styles from './style.module.css';

type ModalProps = {
    type: 'delete' | 'archive',
    icon: IconType,
    title: string,
    text: string,
    open: boolean,
    onClose: React.MouseEventHandler,
    onAction: React.MouseEventHandler,
    actionContent: string,
}

export default function Modal({
    type,
    icon,
    title,
    text,
    open = false,
    onClose,
    onAction,
    actionContent,
}: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const el = dialogRef.current;
        if (el) {
            if (open) {
                el.showModal();
            } else {
                el.close();
            }
        }
    }, [open]);

    return (
        <dialog ref={dialogRef} className={styles.card} aria-label={title}>
            <div className={styles.top}>
                <div className={styles.iconContainer}>
                    <Icon type={icon} className={styles.icon} />
                </div>
                <div className={styles.content}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.text}>{text}</p>
                </div>
            </div>
            <div className={styles.divider} aria-hidden="true" />
            <div className={styles.buttonContainer}>
                <Button variant="secondary" buttonText="Cancel" onClick={onClose} />
                <Button
                    variant={type === 'delete' ? 'danger' : 'primary'}
                    buttonText={actionContent}
                    onClick={onAction}
                />
            </div>
        </dialog>
    );
}
