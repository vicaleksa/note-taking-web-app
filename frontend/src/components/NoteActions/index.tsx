import Button from '../Button';
import styles from './style.module.css';
import LinkButton from '../LinkButton';
import useBreakpointType from '../../hooks/useBreakpointType';
import IconArrowLeft from '../Icons/IconArrowLeft';

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
    const breakpointType = useBreakpointType();

    return (
        <>
            {
                breakpointType === 'mobile' && (
                    <div className={styles.navContainer}>
                        <LinkButton href=".." variant="primary">
                            <IconArrowLeft className={styles.backIcon} />
                            Go Back
                        </LinkButton>
                        <div className={styles.rightControl}>
                            { !create && <Button variant="ghost" leftIcon="delete" onClick={onDelete} /> }
                            { !create && (
                                <Button
                                    variant="ghost"
                                    leftIcon={archived ? 'restore' : 'archive'}
                                    onClick={onArchive}
                                />
                            )}
                            <Button variant="accentGhost" buttonText="Save Note" onClick={onSave} />
                        </div>
                    </div>
                )
            }
            {breakpointType === 'desktop' && (
                <div className={styles.actionsSidebar}>
                    { !create && (
                        <Button
                            variant="iconButton"
                            leftIcon={archived ? 'restore' : 'archive'}
                            onClick={onArchive}
                        />
                    )}
                    { !create && (
                        <Button
                            variant="iconButton"
                            leftIcon="delete"
                            onClick={onDelete}
                        />
                    )}
                    <Button variant="primary" buttonText="Save" onClick={onSave} />
                </div>
            )}
        </>
    );
}
