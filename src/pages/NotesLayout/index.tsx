import { Outlet, useLocation } from 'react-router';
import styles from './style.module.css';
import useBreakpointType from '../../hooks/useBreakpointType';
import Notes from '../Notes';

type NotesLayoutProps = {
    archived?: boolean,
}

export default function NotesLayout({ archived = false }: NotesLayoutProps) {
    const breakpointType = useBreakpointType();
    const location = useLocation();

    if (breakpointType === 'mobile' && location.pathname !== '/' && location.pathname !== '/archive') {
        return <Outlet />;
    }

    return (
        <div className={styles.notesLayout}>
            <Notes archived={archived} />
            {breakpointType === 'desktop' && (
                <div className={styles.noteView}>
                    <Outlet />
                </div>
            )}
        </div>
    );
}
