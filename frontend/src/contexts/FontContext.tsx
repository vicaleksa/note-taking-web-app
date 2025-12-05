import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    PropsWithChildren,
} from 'react';
import clearClassNames from '../utils/clearClassNames';

type Font = 'sansSerif' | 'serif' | 'monospace';

interface FontContextValue {
    font: Font,
    switchFont: (fontMode: Font) => void,
}

const FontContext = createContext<FontContextValue>({
    font: 'sansSerif',
    switchFont: () => {},
});

const fonts = ['sansSerif', 'serif', 'monospace'];

export function FontProvider({ children }: PropsWithChildren) {
    const [font, setFont] = useState<Font>('sansSerif');

    useEffect(() => {
        let savedFont = localStorage.getItem('font');
        if (savedFont === null) {
            savedFont = 'sansSerif';
        }
        setFont(savedFont as Font);
        clearClassNames(document.body, fonts);
        document.body.classList.add(savedFont);
    }, []);

    const switchFont = useCallback((fontMode: Font) => {
        setFont(fontMode);
        localStorage.setItem('font', fontMode);
        clearClassNames(document.body, fonts);
        document.body.classList.add(fontMode);
    }, []);

    const value = useMemo(
        () => ({ font, switchFont }),
        [font, switchFont],
    );

    return (
        <FontContext.Provider value={value}>
            {children}
        </FontContext.Provider>
    );
}

export const useFont = () => useContext(FontContext);
