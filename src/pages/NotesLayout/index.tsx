import { Outlet, useParams } from 'react-router';
import styles from './style.module.css';
import useBreakpointType from '../../hooks/useBreakpointType';
import Notes from '../Notes';
import TagsOverview from '../TagsOverview';

type NotesLayoutProps = {
    archived?: boolean,
    tags?: boolean,
}

export default function NotesLayout({ archived = false, tags = false }: NotesLayoutProps) {
    const breakpointType = useBreakpointType();
    const { id } = useParams();
    const { tagId } = useParams();

    const isMobile = breakpointType === 'mobile';
    const isTagOverview = tags && !tagId;

    if (isMobile) {
        if (isTagOverview) {
            return <TagsOverview />;
        }
        if (!tags && !id) {
            return <Notes archived={archived} />;
        }
        return <Outlet />;
    }

    return (
        <div className={styles.notesLayout}>
            <Notes archived={archived} tags={tags} />
            <div className={styles.noteView}>
                <Outlet />
            </div>
        </div>
    );
}
