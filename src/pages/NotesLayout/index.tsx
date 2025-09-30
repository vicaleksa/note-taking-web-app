import styles from './style.module.css';
import useBreakpointType from '../../hooks/useBreakpointType';
import Notes from '../Notes';

type NotesLayoutProps = {
    children: React.ReactElement;
}

export default function NotesLayout({ children }: NotesLayoutProps) {
    const breakpointType = useBreakpointType();

    return (
        <div className={styles.notesLayout}>
            {breakpointType === 'desktop' && <Notes />}
            <div className={styles.noteView}>
                {children}
            </div>
        </div>
    );
}
