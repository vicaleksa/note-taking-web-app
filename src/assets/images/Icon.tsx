import IconArchive from './IconArchive';
import IconArrowLeft from './IconArrowLeft';
import IconDelete from './IconDelete';
import IconHome from './IconHome';
import IconInfo from './IconInfo';
import IconPlus from './IconPlus';
import IconSearch from './IconSearch';
import IconSettings from './IconSettings';
import IconShow from './IconShow';
import IconTag from './IconTag';

type iconProps = {
    type: string;
    className: string;
}

export default function Icon({ type, className }: iconProps) {
    if (type === 'show') {
        return <IconShow className={className} />;
    }
    if (type === 'plus') {
        return <IconPlus className={className} />;
    }
    if (type === 'info') {
        return <IconInfo className={className} />;
    }
    if (type === 'home') {
        return <IconHome className={className} />;
    }
    if (type === 'search') {
        return <IconSearch className={className} />;
    }
    if (type === 'archive') {
        return <IconArchive className={className} />;
    }
    if (type === 'tag') {
        return <IconTag className={className} />;
    }
    if (type === 'settings') {
        return <IconSettings className={className} />;
    }
    if (type === 'arrow left') {
        return <IconArrowLeft className={className} />;
    }
    if (type === 'delete') {
        return <IconDelete className={className} />;
    }
    return null;
}
