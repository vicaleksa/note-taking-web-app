import formatDate from '../../utils/formatDate';
import styles from './style.module.css';

type NoteCardProps = {
    title: string,
    tags: string[],
    date: string,
}

export default function NoteCard({
    title,
    tags,
    date,
}: NoteCardProps) {
    const tagElements = tags.map((tag) => (
        <div key={tag} className={styles.tag}>{tag}</div>
    ));

    const formattedDate = formatDate(date);

    return (
        <div className={styles.card}>
            <p className={styles.title}>{title}</p>
            <div className={styles.tagsWrapper}>
                {tagElements}
            </div>
            <p className={styles.date}>{formattedDate}</p>
        </div>
    );
}
