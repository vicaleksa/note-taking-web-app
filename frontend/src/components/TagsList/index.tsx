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
            <NavLink
                to={`/tags/${tag}`}
                className={getNavClassName}
                aria-label={`View notes tagged '${tag}'`}
            >
                <Icon type="tag" className={styles.icon} />
                <p className={styles.tagTitle}>{tag}</p>
            </NavLink>
            <div className={styles.divider} aria-hidden="true" />
        </Fragment>
    ));

    return tagsList;
}
