import IconArchive from './IconArchive';
import IconArrowLeft from './IconArrowLeft';
import IconCheckmark from './IconCheckmark';
import IconClock from './IconClock';
import IconClose from './IconClose';
import IconDelete from './IconDelete';
import IconHome from './IconHome';
import IconInfo from './IconInfo';
import IconLoading from './IconLoading';
import IconPlus from './IconPlus';
import IconRestore from './IconRestore';
import IconSearch from './IconSearch';
import IconSettings from './IconSettings';
import IconShow from './IconShow';
import IconTag from './IconTag';

const icons = {
    show: IconShow,
    plus: IconPlus,
    info: IconInfo,
    home: IconHome,
    search: IconSearch,
    archive: IconArchive,
    tag: IconTag,
    settings: IconSettings,
    arrowLeft: IconArrowLeft,
    delete: IconDelete,
    clock: IconClock,
    restore: IconRestore,
    loading: IconLoading,
    checkmark: IconCheckmark,
    close: IconClose,
};

export type IconType = keyof typeof icons;

interface IconProps {
    type: IconType;
    className?: string;
}

export default function Icon({ type, className }: IconProps) {
    const Component = icons[type];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!Component) {
        console.warn(`Unknown icon type: ${type}`);
        return null;
    }
    return <Component className={className} />;
}
