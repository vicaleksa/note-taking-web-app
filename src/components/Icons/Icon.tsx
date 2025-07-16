import IconArchive from './IconArchive';
import IconArrowLeft from './IconArrowLeft';
import IconClock from './IconClock';
import IconDelete from './IconDelete';
import IconHome from './IconHome';
import IconInfo from './IconInfo';
import IconPlus from './IconPlus';
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
