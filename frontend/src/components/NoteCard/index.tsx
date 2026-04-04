import formatDate from '../../utils/formatDate';
import styles from './style.module.css';

type Tags = {
    id: number,
    name: string,
}

type NoteCardProps = {
    title: string,
    tags: Tags[],
    date: string,
}

export default function NoteCard({
    title,
    tags,
    date,
}: NoteCardProps) {
    const tagElements = tags.map((tag) => (
        <div key={tag.name} className={styles.tag}>{tag.name}</div>
    ));
    const formattedDate = formatDate(date);

    return (
        <div className={styles.card}>
            <p className={styles.title}>{title}</p>
            <div className={styles.tagsWrapper}>
                {tagElements}
            </div>
            <time className={styles.date}>{formattedDate}</time>
        </div>
    );
}
