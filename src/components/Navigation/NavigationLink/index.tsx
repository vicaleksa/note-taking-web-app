import clsx from 'clsx';
import { NavLink } from 'react-router';
import styles from './style.module.css';
import Icon, { IconType } from '../../Icons/Icon';

type NavigationLinkProps = {
    link: string;
    icon: IconType;
    text: string;
}

const getNavClassName = ({ isActive }: { isActive: boolean }) => clsx(
    styles.linkContainer,
    { [styles.linkContainerActive]: isActive },
);

export default function NavigationLink({ link, icon, text }: NavigationLinkProps) {
    return (
        <NavLink
            to={link}
            className={getNavClassName}
        >
            <Icon type={icon} />
            <span className={styles.text}>{text}</span>
        </NavLink>
    );
}
