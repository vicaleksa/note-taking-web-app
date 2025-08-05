import IconArchive from './IconArchive';
import IconArrowLeft from './IconArrowLeft';
import IconCheckmark from './IconCheckmark';
import IconChevronRight from './IconChevronRight';
import IconClock from './IconClock';
import IconClose from './IconClose';
import IconDelete from './IconDelete';
import IconFont from './IconFont';
import IconHome from './IconHome';
import IconInfo from './IconInfo';
import IconLoading from './IconLoading';
import IconLock from './IconLock';
import IconLogout from './IconLogout';
import IconMoon from './IconMoon';
import IconPlus from './IconPlus';
import IconRestore from './IconRestore';
import IconSearch from './IconSearch';
import IconSettings from './IconSettings';
import IconShow from './IconShow';
import IconSun from './IconSun';
import IconSunAndMoon from './IconSunAndMoon';
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
    sun: IconSun,
    font: IconFont,
    lock: IconLock,
    logout: IconLogout,
    chevronRight: IconChevronRight,
    moon: IconMoon,
    sunAndMoon: IconSunAndMoon,
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
