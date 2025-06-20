import { useParams } from 'react-router';
import IconClock from '../../components/Icons/IconClock';
import IconTag from '../../components/Icons/IconTag';
import styles from './style.module.css';
import data from '../../data.json';
import formatDate from '../../utils/formatDate';
import NoteActions from './NoteActions';

export default function NoteDetail() {
    const { id } = useParams();
    const selectedNote = data.notes.find((note) => id === note.id);
    if (!selectedNote) {
        return <p>Note is not found</p>;
    }
    const {
        title,
        tags,
        content,
        lastEdited,
    } = selectedNote;
    const tagElements = tags.join(', ');
    const date = formatDate(lastEdited);

    return (
        <>
            <NoteActions />
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.property}>
                <IconTag className={styles.propertyIcon} />
                <div className={styles.propertyName}>Tags</div>
                <div>{tagElements}</div>
                <IconClock className={styles.propertyIcon} />
                <div className={styles.propertyName}>Last edited</div>
                <time>{date}</time>
            </div>
            <p className={styles.text}>
                {content}
            </p>
        </>
    );
}
