import IconInfo from './IconInfo';
import IconPlus from './IconPlus';
import IconShow from './IconShow';

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
    return null;
}
