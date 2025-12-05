import { useEffect, useState } from 'react';

type BreakpointType = 'mobile' | 'desktop';

const useBreakpointType = () => {
    const [breakpointType, setBreakpointType] = useState<BreakpointType>(
        window.matchMedia('(width >= 64rem)').matches ? 'desktop' : 'mobile',
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(width >= 64rem)');
        const handleChange = (event: MediaQueryListEvent) => {
            setBreakpointType(event.matches ? 'desktop' : 'mobile');
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return breakpointType;
};

export default useBreakpointType;
