import useBreakpointType from '../../hooks/useBreakpointType';
import Notes from '../../pages/Notes';

export default function ResponsiveNotes() {
    const breakpointType = useBreakpointType();

    if (breakpointType === 'mobile') {
        return <Notes tags />;
    }

    return null;
}
