import { NavLink } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import clsx from 'clsx';
import Icon from '../Icons/Icon';
import styles from './style.module.css';

interface TagsListProps {
    tags: string[],
}

const getNavClassName = ({ isActive }: { isActive: boolean }) => clsx(
    styles.tagContainer,
    { [styles.tagContainerActive]: isActive },
);

export default function TagsList({ tags }: TagsListProps) {
    const tagsList = tags.map((tag) => (
        <Fragment key={tag}>
            <NavLink to={tag} className={getNavClassName}>
                <Icon type="tag" className={styles.icon} />
                <p className={styles.tagTitle}>{tag}</p>
            </NavLink>
            <div className={styles.divider} />
        </Fragment>
    ));

    return tagsList;
}
