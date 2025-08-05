import Button from '../Button';
import styles from './style.module.css';
import BackLink from '../BackLink';

type NoteActionsProps = {
    onSave: React.MouseEventHandler,
    onDelete: React.MouseEventHandler,
    onArchive: React.MouseEventHandler,
    create: boolean,
    archived?: boolean,
}

export default function NoteActions({
    onSave,
    onDelete,
    onArchive,
    create,
    archived,
}: NoteActionsProps) {
    return (
        <div className={styles.navContainer}>
            <BackLink text="Go Back" />
            <div className={styles.rightControl}>
                { !create && <Button variant="ghost" leftIcon="delete" onClick={onDelete} /> }
                { !create && (
                    <Button
                        variant="ghost"
                        leftIcon={archived ? 'restore' : 'archive'}
                        onClick={onArchive}
                    />
                )}
                <Button variant="ghost" buttonText="Save Note" color="blue" onClick={onSave} />
            </div>
        </div>
    );
}
