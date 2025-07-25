import { Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import Icon from '../../../components/Icons/Icon';
import styles from './style.module.css';

interface TagsListProps {
    tags: string[],
}

export default function TagsList({ tags }: TagsListProps) {
    const tagsList = tags.map((tag) => (
        <Fragment key={tag}>
            <Link to={tag} className={styles.container}>
                <Icon type="tag" className={styles.icon} />
                <p className={styles.tagTitle}>{tag}</p>
            </Link>
            <div className={styles.divider} />
        </Fragment>
    ));

    return tagsList;
}
